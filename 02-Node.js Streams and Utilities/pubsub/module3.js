const { subscribe } = require('./observer');

let runningTotal = 0;

subscribe('message', (data) => {
    runningTotal += data;
    console.log('Current running total is:', runningTotal);
});