const crypto = require('crypto');
const fs = require('fs');

const fileBuffer = fs.readFileSync('vlibras-plugin.js');
const hashSum = crypto.createHash('sha384');
hashSum.update(fileBuffer);

const hex = hashSum.digest('base64');
console.log(hex);
