'use strict';

const fs = require('fs');
const path = require('path');

const certificatePEM = fs.readFileSync(
	path.resolve(__dirname, './certificate.pem'),
	'utf-8',
);
const privateKeyPEM = fs.readFileSync(
	path.resolve(__dirname, './private-key.pem'),
	'utf-8',
);

module.exports = {
	certificatePEM,
	privateKeyPEM,
};
