var fs = require('fs');
const chalk = require('chalk')

var read = fs.createReadStream(__dirname + '/text.txt', 'utf-8');

read.on('data', function(temp) {
    console.log(chalk.magenta(temp));
});