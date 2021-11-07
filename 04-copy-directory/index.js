const fs = require('fs');
const chalk = require('chalk')
const { readdir } = require('fs').promises
const { access } = require('fs');
const { constants } = require('fs');
const path = require('path/posix');


fs.access('04-copy-directory/files-copy', constants.F_OK, (err) => {
    if(err) {
        fs.mkdir('04-copy-directory/files-copy', err => {
            if(err) throw err; 
        });
    }
});

async function push() {
    try {
        const files = await readdir(path.join(__dirname, 'files'), {
            withFileTypes: true,
        });
        const filesDelet = await readdir(path.join(__dirname, 'files-copy'), {
            withFileTypes: true,
        });
        for (const file of filesDelet) {
            
            fs.unlink(`04-copy-directory/files-copy/${file.name}`, (err) => {
                if (err) throw err;
              
            });
        }    
        for (const file of files) {
            
            fs.copyFile(`04-copy-directory/files/${file.name}`, `04-copy-directory/files-copy/${file.name}`, err => {
                if(err) {
                    console.log('ошибка');
                    return;
                }
            });
        }           
    }
    catch (err) {
        console.error(err);
    }
}
push();
console.log(chalk.magenta('Операция завершена успешно)))'));
