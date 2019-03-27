'use strict';

const path = require('path');
const fs = require('fs');
const forge = require('node-forge');
const {certificatePEM, privateKeyPEM} = require('../samples/certificates/001');

const {pki} = forge;

async function main() {
	console.log('Executing');
	const privateKeyForge = pki.privateKeyFromPem(privateKeyPEM);
	const certificateForge = pki.certificateFromPem(certificatePEM);
	const publicKeyForge = certificateForge.publicKey;
	const md = forge.md.sha1.create();

	const droneObject = {
		version: 'ryze-tello-1',
		txn: 'test',
		deviceId: 'device-uuid-1',
		deviceModelId: 'ryze-tello',
		operatorBusinessIdentifier: '4f034a579e1c47e6affeddee77fa4855',
		idHash: null,
	};

	const stringToSign = JSON.stringify(droneObject);
	console.log(`string to sign: ${stringToSign}`);

	md.update(stringToSign);
	const data = md.digest().bytes();
	const sign = privateKeyForge.sign(md);
	console.log('signature:', forge.util.encode64(sign));
}

main()
	.then(() => {
		console.log('Execution Complete');
	})
	.catch((error) => {
		console.log(error);
	});
