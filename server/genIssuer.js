const Identity = require("@iota/identity-wasm/node")
const fs = require('fs');
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

const name = "TestIssuer"

function generateUser(name) {
  const {doc, key} = new Document(KeyType.Ed25519)
    
    return {
      doc,
      key,
      name,
    }
}

async function run() {
  // Generate a KeyPair, DID, and Document for user
  const issuer = generateUser(name)

  // Add a Merkle Key Collection method for Bob, so compromised keys can be revoked.
  const keys = new KeyCollection(KeyType.Ed25519, 8)
  const method = Method.createMerkleKey(Digest.Sha256, issuer.doc.id, keys, "key-collection")

  issuer.doc.insertMethod(method, "VerificationMethod")

  issuer.doc.sign(issuer.key)

  issuermessage = await Identity.publish(issuer.doc.toJSON(), CLIENT_CONFIG)

  const issuerString = JSON.stringify(issuer)

  fs.writeFile("testIssuer.json", issuerString, (err, issuer) => {
    if(err) console.log('error', err);
  });
}

run()