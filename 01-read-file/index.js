const fs = require('fs');
const path = require('path');
const pathToFile = path.join('01-read-file', 'text.txt');

const stream = new fs.createReadStream(pathToFile);

stream.pipe(process.stdout);