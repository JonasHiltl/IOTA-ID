const express = require('express')
const { jsPDF } = require("jspdf");
const Identity = require("@iota/identity-wasm/node")
const testIssuer = require("../testIssuer.json")
const { deCreatePDF } = require("./deCreatePDF")
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
    let pdf
    if(language === "de") {
      let pdf = deCreatePDF(personalData, allergyData, medicationData)
    }

    return res
      .json({
        pdf: pdf,
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