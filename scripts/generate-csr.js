'use strict';

const forge = require('node-forge');

function generateCSR() {
	// generate a key pair
	const keys = forge.pki.rsa.generateKeyPair(1024);

	// create a certification request (CSR)
	const csr = forge.pki.createCertificationRequest();
	csr.publicKey = keys.publicKey;
	csr.setSubject([
		{
			name: 'commonName',
			value: 'Algopixel Technologies Pvt. Ltd.',
		},
		{
			name: 'countryName',
			value: 'IN',
		},
		{
			shortName: 'ST',
			value: 'Karnataka',
		},
		{
			name: 'localityName',
			value: 'Koramangala',
		},
		{
			name: 'organizationName',
			value: 'Algopixel Technologies Pvt. Ltd.',
		},
		{
			shortName: 'OU',
			value: 'IT',
		},
	]);
	// set (optional) attributes
	csr.setAttributes([
		{
			name: 'challengePassword',
			value: 'password',
		},
		{
			name: 'unstructuredName',
			value: 'My Company, Inc.',
		},
		{
			name: 'extensionRequest',
			extensions: [
				{
					name: 'subjectAltName',
					altNames: [
						{
							// 2 is DNS type
							type: 2,
							value: 'test.domain.com',
						},
						{
							type: 2,
							value: 'other.domain.com',
						},
						{
							type: 2,
							value: 'www.domain.net',
						},
					],
				},
			],
		},
	]);

	// sign certification request
	csr.sign(keys.privateKey);

	// convert certification request to PEM-format
	const pem = forge.pki.certificationRequestToPem(csr);
	console.log(pem);
}

async function main() {
	console.log('Executing');
	generateCSR();
}

main()
	.then(() => {
		console.log('Execution Complete');
	})
	.catch((error) => {
		console.log(error);
	});
