const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
let first = false;

console.log('Запишите текст в файл');

rl.on('line', (input) => {
    inputFake = input;
    if(first == false) {
        first = true;
    }
    else {
        inputFake = `\n${input}`
    }    
    fs.appendFile("02-write-file/dimon.txt", inputFake, function(err){
        if(err) throw err;
    });

    if(input == 'exit') {
        console.log('Всего хорошего)');

        process.exit();
    }
})
process.on('beforeExit', function() {
    console.log('Всего хорошего)');
});
