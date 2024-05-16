require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { build_apikey, new_cert } = require('@analog-labs/timegraph-wasm'); // SKG package
const { keygen } = require('@analog-labs/timegraph-js'); // Watch Client
const { Keyring } = require('@polkadot/keyring');
const { hexToU8a } = require('@polkadot/util');
const { waitReady } = require('@polkadot/wasm-crypto');

const WALLET_JSON = ""
const WALLET_ADD = ""
const PASSWORD = ""

const [certificate, secret] = new_cert(
    WALLET_ADD, 
    'developer',
);
const keyring = new Keyring({ type: 'sr25519' });

waitReady()
  .then(async () => {
    const keypair = keyring.addFromJson(WALLET_JSON)
    keypair.decodePkcs8(PASSWORD);
    const _keygen = new keygen({
      signer: keypair.sign,
      address: keypair.address,
    });
    const signedData = keypair.sign(certificate);
    const data = build_apikey(secret, certificate, signedData);
    const sessionKey = await _keygen.createSessionkey(30000000000); // one year is 30000000000 ms
    const dataPathKey = path.join('./.data.json');
    fs.appendFile(dataPathKey, JSON.stringify(data, null, 2), function (err) {
      if (err) throw err;
      console.log('create data success');
    });

    const sessionKeyPath = path.join('./.session.txt');
    fs.appendFile(sessionKeyPath, sessionKey["ssk"], function (err) {
      if (err) throw err;
      console.log('create session success');
    });
  })
  .catch((error) => {
    console.log('error', error);
  });
