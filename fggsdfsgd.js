// class File {
//     constructor(fullName, contents) {
//       this.fullName = fullName;
//       this.contents = contents;
      
//       this.filename = '';
//       for(let i = 0;; i++) {
//         if(this.fullName[i] == '.') break;
//         this.filename += fullName[i];
//       }
      
//       this.extension = '';
//       for(let i = fullName.length - 1; ; i--) {
//         if(fullName[i] == '.') break;
//         this.extension = fullName[i] + this.extension;
//       }
      
//       this.kolvoVyzivovGets = 0;
//       this.kolvoVyzovGetc = 0;
//     }
//     getContents() {
//       return this.contents;
//     }
//     write(str) {
//       if(this.contents == "") this.contents += str;
//       else {
//         this.contents += `$\\{str}`;
//       }
//     }
//     gets() {
//       let currentStr;

//       let kolvoSkobokIskl = 0;
//       for(let i = 0; i < this.contents.length; i++) {
//         if(this.contents[i] == '\\') kolvoSkobokIskl++;
//       }
//       if(this.kolvoVyzivov - 1 == kolvoSkobokIskl) return undefined;
      
//       let currentStr;
//       let currentScobok = 0;
//       for(let i = 0; i < this.contents.length; i++) {
//           if(currentScobok == this.kolvoVyzivovGets) {
//             while(this.contents[i] != '\\') {
//                 currentStr += this.contents[i];
//             }
//           }
//           if(this.contents[i] == '\\') currentScobok++;
//       }
      
      
      
      
      
      
//       this.kolvoVyzivovGets++;
//       return currentStr;
//     }



//     getc() {
//       return this.contents[this.kolvoVyzovGetc];
      
      
//       this.kolvoVyzovGetc++;
//     }
// }

// let a  = File('okajfs', 's;lkfgmds/dsfgdsfg/sfgdfsgsdfg/asgafdsgf');
// a.gets;
// a.gets;

function a(strPered, number) {
  let currentStr = '';
    
  let kolvoSkobokIskl = 0;
  for(let i = 0; i < strPered.length; i++) {
    if(strPered[i] == '\n') kolvoSkobokIskl++;
  }
  if(number - 1  == kolvoSkobokIskl) return undefined;

  let kolvoSkobok = 0;
  let temp = 0;

  while(kolvoSkobok != number) {
    if(strPered[temp] == '\n') kolvoSkobok++;
    temp++;
  }
  while(strPered[temp] != '\n') {
    currentStr += strPered[temp];
    temp++;
  }


  return currentStr;
}
a('first\nsecond\nthird\nfour\nfive', 4)






// let strPrev = 'first';
// function write(str) {
//   if(strPrev == "") strPrev += str;
//   else {
//     strPrev += `\n${str}`;
//   }

// } 
// write('second');