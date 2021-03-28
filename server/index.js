// comments based on W3C
//
// Holders of verifiable credentials can generate verifiable presentations -> then share these verifiable presentations with verifiers to prove their possesion of the credential


const express = require("express");
const Identity = require("@iota/identity-wasm/node")
const cors = require("cors");
const fetch = require("node-fetch")
const server = express();
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

server.use(cors({origin: "http://localhost:3000", credentials: true }))
server.use(express.json())

server.post("/create", async (req, res) => {
  const {firstName, lastName, email} = req.body;
  const name = `${firstName} ${lastName}` 

  try {
    if (!firstName) {
      return res
        .json({
          message: "Please enter your first name",
          success: false
        })
        .status(500);
    }
    if (!lastName) {
      return res
        .json({
          message: "Please enter your last name",
          success: false
        })
        .status(500);
    }
    if (!email) {
      return res
        .json({
          message: "Please enter an email",
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
    console.log(user)
    // Sign users DID Documents
    user.doc.sign(user.key)
    
    user.message = await Identity.publish(user.doc.toJSON(), CLIENT_CONFIG)
    console.log(`Published user: https://explorer.iota.org/mainnet/transaction/${user.message}`)

    const personalInformation = {
      id: user.doc.id.toString(),
      name: {
        first: firstName,
        last: lastName
      },
      phoneNumber: phoneNumber,
      email: email,
      DOB: birthDate,
      gender: gender,
      address: {
        street: streetNumber, //Schuldorffstraße 10
        postalCode: postalCode,
        city: city,
        country: country
      }
    }

    const unsignedVc = VerifiableCredential.extend({
      id: "http://example.edu/credentials/3732",
      type: "personalInformationCredential",
      issuer: user2.doc.id.toString(),
      personalInformation,
    })

    res
      .json({
        id: user.doc.id.tag,
        docHash: user.message,
        pubKey: user.key.public,
        privKey: user.key.secret,
        message: `You have successfully created your digital identity, ${firstName}`,
        success: true
      })
      .status(500);
  } catch (error) {
    res
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



server.listen(3001, ()=>{
  console.log("***********************************");
  console.log("API server listening at localhost:3001");
  console.log("***********************************");
});