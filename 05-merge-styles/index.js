const fs = require('fs');
const chalk = require('chalk')
const { readdir } = require('fs').promises
const { access } = require('fs');
const { constants } = require('fs');
const path = require('path/posix');

async function push() {
    fs.writeFile("05-merge-styles/project-dist/bundle.css", "", function(error) {
        if(error) throw error; 
    }); 
    try {
        const files = await readdir(path.join(__dirname, 'styles'), {
            withFileTypes: true,
        });
        for (const file of files) {
            if(file.isFile()) {

                let index = ''
                for(let i = file.name.length - 3; i < file.name.length; i++) {
                    index += file.name[i];
                }
                if(index == 'css') {
                    fs.readFile(`05-merge-styles/styles/${file.name}`, "utf8", function(error,data){
                        if(error) {
                            console.log('ошибочка');
                        }
                        else {        
                            fs.appendFile("05-merge-styles/project-dist/bundle.css", `\n${data}`, function(err){
                                if(err) throw err;
                            });                                    
                        }
                    });
                }
            }
        }
 
    }
    catch (err) {
        console.error(err);
    }
}

push();

console.log(chalk.magenta('Операция завершена успешно;)'));
