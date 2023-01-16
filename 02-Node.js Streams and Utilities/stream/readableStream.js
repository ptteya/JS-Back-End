const fs = require('fs');

const readStream = fs.createReadStream('./data.txt', { encoding: 'utf-8' });

readStream.on('data', (data) => {
    console.log('-------------New Chunk-------------');
    console.log(data);
});

readStream.on('close', () => {
    console.log('Stream closed');
});