const express = require("express")
const { composeAPI, generateAddress } = require("@iota/core");
const Converter = require("@iota/converter");
const Identity = require("@iota/identity-wasm/node")
const ipfsClient = require("ipfs-http-client")
const { SHA3 } = require("sha3");
const { globSource } = ipfsClient
const testIssuer = require("../testIssuer.json")
const { deCreatePDF } = require("./deCreatePDF")
const { enCreatePDF } = require("./enCreatePDF")
const { CLIENT_CONFIG } = require("../config")
global.Headers = fetch.Headers
global.Request = fetch.Request
global.Response = fetch.Response
global.fetch = fetch

const {
  Digest,
  DID,
  Document,
  KeyCollection,
  KeyPair,
  KeyType,
  Method,
  VerifiableCredential,
  VerifiablePresentation,
} = Identity

const router = express.Router();

router.post("/create", async (req, res) => {
  const { personalData, allergyData, medicationData, language } = req.body;
  try {
    let pdf
    let currentDate
    if(language === "de") {
      currentDate = new Date()
      pdf = deCreatePDF(personalData, allergyData, medicationData)
    } else {
      pdf = enCreatePDF(personalData, allergyData, medicationData)
    }

    const hash = new SHA3(256);
    hash.update(pdf);
    const hex = hash.digest("hex");

    const buffer = Buffer.from(pdf, "base64");

    const client = ipfsClient();

    const addResponse = await client.add(buffer);
    const ipfsHash = addResponse.path;
    const size = buffer.length;

    const iota = composeAPI({
      provider: CLIENT_CONFIG.node
    });

    const depth = 3;
    const minimumWeightMagnitude = 14;

    const address = "HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D";
    const seed = "PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";
    const tanglePayload = {
      size: size,
      created: currentDate,
      hash: hex,
      ipfs: ipfsHash
    };

    const message = JSON.stringify(tanglePayload);
    const messageInTrytes = Converter.asciiToTrytes(message);

    const transfers = [
      {
          value: 0,
          address: address,
          message: messageInTrytes
      }
    ];

    await iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        console.log(bundle[0].hash)
    })
    .catch(err => {
      return res
      .json({
        error: err,
        message: "Error sending transaction to the tanlge",
        success: false
      })
      .status(500);
    });

    return res
      .json({
        pdf: pdf,
        message: "Patient Questionnaire is successfully created",
        success: true
      })
      .status(200);
  } catch (error) {
    console.log(error)
    return res
      .json({
        error: error,
        message: "There was a Problem with our Servers",
        success: false
      })
      .status(500);
  }


})

module.exports = router