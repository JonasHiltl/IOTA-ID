// comments based on W3C
//
// Holders of verifiable credentials can generate verifiable presentations -> then share these verifiable presentations with verifiers to prove their possesion of the credential
const express = require("express");
const Identity = require("@iota/identity-wasm/node")
const cors = require("cors");
const server = express();
const testIssuer = require("./testIssuer.json")
const fetch = require("node-fetch")
const patientQuestionnaireRoute = require("./routes/patientQuestionnaire")
const { CLIENT_CONFIG } = require("./config")
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



server.use(cors())
server.use(express.json({ limit: "10MB" }))

server.use("/patient-questionnaire", patientQuestionnaireRoute);

server.post("/create", async (req, res) => {
  const {firstName, lastName, email, phoneNumber, dateOfBirth, sex, address, city, state, postalCode, country} = req.body;
  const name = `${firstName} ${lastName}` 
  console.log(req.body)

  try {
    const reqIsIncomplete = Object.values(req.body).find(value => !value);
    if (reqIsIncomplete) {
      return res
        .json({
          message: "You are missing personal information",
          success: false
        })
        .status(500);
    }

    // helper function
    function generateUser(name) {
      const {doc, key} = new Document(KeyType.Ed25519)
      
      return {
        doc,
        key,
        name,
      }
    }

    // Generate a KeyPair, DID, and Document for user
    const user = generateUser(name)
    // Sign users DID Documents
    user.doc.sign(user.key)

    user.message = await Identity.publish(user.doc.toJSON(), CLIENT_CONFIG)

    const personalInformation = {
      id: user.doc.id.toString(),
      name: {
        first: firstName,
        last: lastName
      },
      dateOfBirth: dateOfBirth,
      sex: sex,
      email: email,
      phoneNumber: phoneNumber,
      address: {
        street: address,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
      }
    }

    const deserializedTestIssuer = Document.fromJSON(testIssuer.issuer.doc)
    const deserializedKeyCollection = KeyCollection.fromJSON(testIssuer.keyKollection)

    const unsignedVc = VerifiableCredential.extend({
      id: "http://example.edu/credentials/3732",
      type: "personalInformationCredential",
      issuer: deserializedTestIssuer.id.toString(),
      credentialSubject: personalInformation,
    })

    // Sign the credential with testIssuer"s Merkle Key Collection method
    const signedVc = deserializedTestIssuer.signCredential(unsignedVc, {
      method: testIssuer.issuer.doc.verificationMethod[0].id,
      public: deserializedKeyCollection.public(0),
      secret: deserializedKeyCollection.secret(0),
      proof: deserializedKeyCollection.merkleProof(Digest.Sha256, 0),
    })

    if (!deserializedTestIssuer.verify(signedVc)) {
      return res
        .json({
          message: "Your credential is not verified",
          success: false
        })
        .status(500);
    }

    return res
      .json({
        id: user.doc.id.tag,
        docHash: user.message,
        pubKey: user.key.public,
        privKey: user.key.secret,
        credential: signedVc,
        message: `You have successfully created your digital identity, ${firstName}`,
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
});

server.post("/verify", async (req, res) => {
  const {id} = req.body;
  // reformat the id to fit the iota format
  const docId = `did:iota:${id}`

  try {
    if (!id) {
      return res
        .json({
          message: "Identity not found",
          success: false
        })
        .status(500);
    }

    try {
      // resolve the document
      const doc = await Identity.resolve(docId, CLIENT_CONFIG)
      // parse the document
      const document = Document.fromJSON(doc)
      if (document.verify()) {
        const documentJSON = document.toJSON();
        const date = documentJSON.created;
        return res
          .json({
            message: `Identity is valid and created at ${date}`,
            success: true
          })
          .status(200);
    }
    } catch (error) {
      return res
      .json({
        error: error,
        message: "Identity not found",
        success: false
      })
      .status(500);
    }
  } catch (error) {
    return res
      .json({
        message: "There was a Problem with our Servers",
        success: false
      })
      .status(500);
  }
})

server.post("/update-personal-credential", async (req, res) =>{
  const {id, firstName, lastName, dateOfBirth, sex, email, phoneNumber, streetNumber, city, state, postalCode, country} = req.body;

  try {
    const personalInformation = {
      id: id,
      name: {
        first: firstName,
        last: lastName
      },
      dateOfBirth: dateOfBirth,
      sex: sex,
      email: email,
      phoneNumber: phoneNumber,
      address: {
        street: address,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
      }
    }

    const deserializedTestIssuer = Document.fromJSON(testIssuer.issuer.doc)
    const deserializedKeyCollection = KeyCollection.fromJSON(testIssuer.keyKollection)

    const unsignedVc = VerifiableCredential.extend({
      id: "http://example.edu/credentials/3732",
      type: "personalInformationCredential",
      issuer: deserializedTestIssuer.id.toString(),
      credentialSubject: personalInformation,
    })

    // Sign the credential with testIssuer"s Merkle Key Collection method
    const signedVc = deserializedTestIssuer.signCredential(unsignedVc, {
      method: testIssuer.issuer.doc.verificationMethod[0].id,
      public: deserializedKeyCollection.public(0),
      secret: deserializedKeyCollection.secret(0),
      proof: deserializedKeyCollection.merkleProof(Digest.Sha256, 0),
    })

    if (!deserializedTestIssuer.verify(signedVc)) {
      return res
        .json({
          message: "Your credential is not verified",
          success: false
        })
        .status(500);
    }

    return res
      .json({
        credential: signedVc,
        message: `Your credential is updated.`,
        success: true
      })
      .status(500);
  } catch (error) {
    return res
      .json({
        message: "There was a Problem with our Servers",
        success: false
      })
      .status(500);
  }
})



server.listen(3001, ()=>{
  console.log("***********************************");
  console.log("API server listening at localhost:3001");
  console.log("***********************************");
});