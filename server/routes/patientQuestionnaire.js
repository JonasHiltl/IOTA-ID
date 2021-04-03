'use strict';
const express = require('express')
const Identity = require("@iota/identity-wasm/node")
const crypto = require("crypto")
const ipfsClient = require("ipfs-http-client")
const { globSource } = ipfsClient
const testIssuer = require("../testIssuer.json")
const { deCreatePDF } = require("./deCreatePDF")
const { enCreatePDF } = require("./enCreatePDF")
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

const CLIENT_CONFIG = {
  network: "main",
  node: "https://nodes.thetangle.org:443",
}

const router = express.Router();

router.post('/create', async (req, res) => {
  const { personalData, allergyData, medicationData, language } = req.body;
  try {
    console.log(language)
    let pdf
    if(language === "de") {
      pdf = deCreatePDF(personalData, allergyData, medicationData)
    } else {
      pdf = enCreatePDF(personalData, allergyData, medicationData)
    }

    const buffer = Buffer.from(pdf, "base64");
    console.log(buffer)

    const client = ipfsClient()

    const file = await client.add(buffer)
    console.log(file)

    return res
      .json({
        pdf: pdf,
        message: "Patient Questionnaire is successfully created",
        success: true
      })
      .status(500);
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