'use strict';

const fs = require('fs');
const path = require('path');

const csrPEM = fs.readFileSync(
	path.resolve(__dirname, './certificate-signing-request.pem'),
	'utf-8',
);
const privateKeyPEM = fs.readFileSync(
	path.resolve(__dirname, './private-key.pem'),
	'utf-8',
);

module.exports = {
	csrPEM,
	privateKeyPEM,
};
