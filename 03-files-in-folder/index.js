const { readdir } = require('fs').promises
const path = require('path')
const chalk = require('chalk')
{withFileTypes: true}

const {stat} = require('fs');

async function push() {
    try {
        const files = await readdir(path.join(__dirname, 'secret-folder'), {
            withFileTypes: true,
        });
        for (const file of files) {
            if(file.isFile()) {
                let lastPoint;

                for(let i = file.name.length - 1; i > 0; i--) {
                    if(file.name[i] == '.') {
                        lastPoint = i;
                        break;
                    }
                }
                let firstName = '';
                for(let i = 0; i < lastPoint; i++) {
                    firstName  += file.name[i];
                }

                let secondName = '';

                for(let i = lastPoint + 1; i < file.name.length; i++) {
                    secondName += file.name[i];
                }

                const currentFile = path.join(__dirname, `secret-folder/${file.name}`)

                stat(currentFile, function(err, stats)  {
                    if(err) {
                        console.log('Ошибка');
                        return;
                    }
                    console.log(`${firstName} - ${secondName} - ${stats.size/1024} mb`);
                    console.log(chalk.yellow('-------------------------------'));

                });
            }
        }
 
    }
    catch (err) {
        console.error(err);
    }
}
console.log(chalk.magenta('Информация о файлах:'));
console.log(chalk.magenta('-------------------------------'));

push();