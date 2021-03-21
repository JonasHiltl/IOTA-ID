const express = require('express');
const Identity = require('@iota/identity-wasm/node')
const cors = require('cors');
const fetch = require('node-fetch')
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

server.use(cors())
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
    
    res
      .json({
        docHash: user.message,
        pubKey: user.key.public,
        privKey: user.key.secret,
        message: `Published user: https://explorer.iota.org/mainnet/transaction/${user.message}`,
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
  const {docId} = req.body;

  try {
    if (!docId) {
      return res
        .json({
          message: "Please enter an DID",
          success: false
        })
        .status(500);
    }

    try {
      const doc = await Identity.resolve(docId, CLIENT_CONFIG)
      const document = Document.fromJSON(doc)
      console.log(document)
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
        message: "Identity not found",
        success: false
      })
      .status(500);
    }
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

server.listen(3001, ()=>{
  console.log("***********************************");
  console.log("API server listening at localhost:3001");
  console.log("***********************************");
});