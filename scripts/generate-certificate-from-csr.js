'use strict';

const path = require('path');
const fs = require('fs');
const forge = require('node-forge');

const {certificatePEM, privateKeyPEM} = require('../samples/certificates/001');
const {csrPEM} = require('../samples/csr/001');

function signCSR() {
	// convert a Forge certification request from PEM-format
	const forgeCSR = forge.pki.certificationRequestFromPem(csrPEM);
	const forgePrivateKey = forge.pki.privateKeyFromPem(privateKeyPEM);
	const forgeCertificate = forge.pki.certificateFromPem(certificatePEM);

	// verify CSR
	forgeCSR.verify();

	console.log('Creating certificate...');
	const cert = forge.pki.createCertificate();

	// -set_serial 01
	cert.serialNumber = '01';

	// -days 365
	cert.validity.notBefore = new Date();
	cert.validity.notAfter = new Date();
	cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

	// subject from CSR
	cert.setSubject(forgeCSR.subject.attributes);

	// issuer from CA
	cert.setIssuer(forgeCertificate.subject.attributes);

	// set appropriate extensions here (some examples below)
	cert.setExtensions([
		{
			name: 'keyUsage',
			digitalSignature: true,
		},
	]);
	cert.publicKey = forgeCSR.publicKey;

	// sign certificate with CA key
	cert.sign(forgePrivateKey);
	console.log('Certificate created.');
	console.log('Certificate:');
	console.log(forge.pki.certificateToPem(cert));
}

async function main() {
	console.log('Executing');
	signCSR();
}

main()
	.then(() => {
		console.log('Execution Complete');
	})
	.catch((error) => {
		console.log(error);
	});
