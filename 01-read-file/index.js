var fs = require('fs');

var read = fs.createReadStream(__dirname + '/text.txt', 'utf-8');

read.on('data', function(temp) {
    console.log(temp);
});