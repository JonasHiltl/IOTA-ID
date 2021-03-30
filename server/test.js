const Identity = require("@iota/identity-wasm/node")
const testIssuer = require("./testIssuer.json")
const fetch = require('node-fetch')
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

const deserializedTestIssuer = Document.fromJSON(testIssuer.issuer.doc)
console.log(deserializedTestIssuer)

const personalInformation = {
    id: 1
}

console.log(personalInformation)

const unsignedVc = VerifiableCredential.extend({
    id: "http://example.edu/credentials/3732",
    type: "personalInformationCredential",
    issuer: deserializedTestIssuer.id.toString(),
    credentialSubject: personalInformation,
})

console.log(unsignedVc)

// Sign the credential with testIssuer's Merkle Key Collection method
const signedVc = deserializedTestIssuer.signCredential(unsignedVc, {
    method: testIssuer.issuer.doc.verificationMethod[0].id,
    public: deserializedKeyCollection.public(0),
    secret: deserializedKeyCollection.secret(0),
    proof: deserializedKeyCollection.merkleProof(Digest.Sha256, 0),
})

console.log(signedVc)