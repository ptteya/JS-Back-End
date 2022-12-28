const { print, add, data } = require('./util');
const xlsx = require('xlsx');
const fs = require('fs');

print('Hello ' + add(2, 3));

console.log(data[2]);
console.log(xlsx.utils);

fs.writeFileSync('./output.txt', 'Hello World');