class File {
  
    constructor(fullName, contents) {

      this.fullName = fullName;
      this.contents = contents;
      
      this.filename = '';
      for(let i = 0;; i++) {
        if(this.fullName[i] === '.') break;
        this.filename += this.fullName[i];
      }
      
      this.extension = '';
      for(let i = this.fullName.length - 1; ; i--) {
        if(this.fullName[i] == '.') break;
        this.extension = fullName[i] + this.extension;
      }
      
      this.kolvoVyzivovGets = 0;
      this.kolvoVyzovGetc = 0;
    }
    getContents() {
      return this.contents;
    }
    write(str) {
      if(this.contents == "") this.contents += str;
      else {
        this.contents += `$\\{str}`;
      }
    }
    gets() {
      let currentStr;

      let kolvoSkobokIskl = 0;
      for(let i = 0; i < this.contents.length; i++) {
        if(this.contents[i] == '\\') kolvoSkobokIskl++;
      }
      if(this.kolvoVyzivov - 1 == kolvoSkobokIskl) return undefined;
      
      let currentStr;
      let currentScobok = 0;
      for(let i = 0; i < this.contents.length; i++) {
          if(currentScobok == this.kolvoVyzivovGets) {
            while(this.contents[i] != '\\') {
                currentStr += this.contents[i];
            }
          }
          if(this.contents[i] == '\\') currentScobok++;
      }
      
      
      
      
      
      
      this.kolvoVyzivovGets++;
      return currentStr;
    }



    getc() {
      return this.contents[this.kolvoVyzovGetc];
      
      
      this.kolvoVyzovGetc++;
    }
}
let a = 5;