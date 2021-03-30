const Identity = require("@iota/identity-wasm/node")
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.Request = fetch.Request
global.Response = fetch.Response
global.fetch = fetch
const testIssuer = require("./testIssuer.json")
const testIssuerKeys = require("./testIssuerKeys.json")
const testIssuerMerkleProof = require("./testIssuerMerkleProof.json")
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

const serializedTestIssuer = Document.fromJSON(testIssuer.doc)
console.log(serializedTestIssuer)
const serializedKeyCollection = KeyCollection.fromJSON(testIssuerKeys)
console.log(serializedKeyCollection)