const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8', flags: 'a' });

const chunk1 = 'Monica';
const chunk2 = 'Daniel';
const chunk3 = 'Veronica';

writeStream.write(chunk1 + '\n');
writeStream.write(chunk2 + '\n');
writeStream.write(chunk3 + '\n');

writeStream.on('close', () => {
    console.log('Closed Stream');
})

writeStream.end();