const fs = require('fs');
const { readdir } = require('fs').promises
const { access } = require('fs/promises');
const { constants } = require('fs');
const path = require('path/posix');
const exec = require('child_process').exec;

const  readFile = require('fs');

const fsPromises = require('fs').promises;

fs.access('06-build-page/project-dist', constants.F_OK, (err) => {
    if(err) {
        fs.mkdir('06-build-page/project-dist', err => {

            if(err) throw err; 

        });
        createFiles();
    }
    else {
        createFiles();
    }
}); 

fs.access('06-build-page/project-dist/assets', constants.F_OK, (err) => {
    if(err) {
        fs.mkdir('06-build-page/project-dist/assets', err => {

            if(err) throw err; 

        });
    }
}); 

function createFiles() {
    fs.writeFile("06-build-page/project-dist/index.html", "", function(err){
        if (err) {    
            console.log(err);
        } 
    });

    fs.writeFile("06-build-page/project-dist/style.css", "", function(err){
        if (err) {    
            console.log(err);
        }
    });
    
}

function copyFiles(dir, dest) {
    fsPromises.readdir(dir, { withFileTypes: true })
    .then(function(files) {

        for (const file of files) {

            if (file.isDirectory()) {
                copyFiles(path.join(dir, file.name), path.join(dest, file.name));
            }
            else {
                fs.mkdir(dest, { recursive: true, }, function(err) {
                    if (err) {
                        throw err;
                    }
                });
                fsPromises.copyFile(path.join(dir, file.name), path.join(dest, file.name));
            }
        }
    });
}

copyFiles("06-build-page/assets", "06-build-page/project-dist/assets");

async function push() {
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
                    fs.readFile(`06-build-page/styles/${file.name}`, "utf8", function(error,data){
                        if(error) {
                            console.log('ошибочка');
                        }
                        else {
                            fs.appendFile("06-build-page/project-dist/style.css", `\n${data}`, function(err){
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

var mainFile = fs.createReadStream(__dirname + '/template.html', 'utf-8');
let mainHtmlChange;

mainFile.on('data', function(temp) {
    mainHtmlChange = temp;
    pushHtml();
});

async function pushHtml() {
    try {
        const files = await readdir(path.join(__dirname, 'components'), {
            withFileTypes: true,
        });
        for (const file of files) {
            let fileName = '';
            for(let i = 0; file.name[i] != '.' ; i++) fileName += file.name[i];

            let fileFoRead =  fs.createReadStream(__dirname + `/components/${file.name}`, 'utf-8');

            var regFileForRead = new RegExp(`{{${fileName}}}`);

            for await (const chunk of fileFoRead) {
                mainHtmlChange = mainHtmlChange.replace(regFileForRead, chunk);
            }

        }
        fs.writeFile("06-build-page/project-dist/index.html", mainHtmlChange, function(error){
        
            if(error) throw error;
        
        });
    }
    catch (err) {
        console.log(err);
    }
}
