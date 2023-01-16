const fs = require('fs');
const path = require('path');

fs.writeFile(path.resolve(__dirname, './output.txt'), 'Text', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('file created');
})