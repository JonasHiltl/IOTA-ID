const express = require('express')
const Identity = require("@iota/identity-wasm/node")
const testIssuer = require("../testIssuer.json")
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
  const { personalData, allergyData, medicationData } = req.body;
  try {
    console.log(personalData)
    console.log(allergyData)
    console.log(medicationData)

    if (allergyData.length === 0) {console.log(undefined)}

    return res
      .json({
        message: "Patient Questionnaire is successfully created",
        success: true
      })
      .status(500);
  } catch (error) {
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