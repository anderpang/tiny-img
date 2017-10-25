const path=require("path");
const fs=require("fs");
const utils=require("./utils");
const compress=require("./compress");

const EXTNAMES=[".jpg",".png",".jpeg"];

function start(sourcePath,key){
    console.log("In compression...");
    var targetPath=path.join(path.dirname(sourcePath),path.basename(sourcePath)+"_tiny-img");
    walk(sourcePath,targetPath,key);
}

function walk(sourcePath,targetPath,key){
    if(!fs.existsSync(targetPath)){
        fs.mkdirSync(targetPath);
    }

    //glob
   fs.readdir(sourcePath,function(err,files){
       if(err){
           utils.showError(err);
       }
       else
       {
          readFiles(sourcePath,targetPath,files,key);
       }
   });
}

function readFiles(sourcePath,targetPath,files,key){
    var i=files.length,
        next=function(){
           if(i--){
              var file=files[i],
                  filepath=path.join(sourcePath,file),
                  target=path.join(targetPath,file),
                  state=fs.statSync(filepath);
              if(state.isFile()){
                  if(EXTNAMES.indexOf(path.extname(file).toLowerCase())!==-1)
                  {
                      compress(filepath,target,key,next);
                  }
                  else
                  {
                      next();
                  }
              }
              else if(state.isDirectory())
              {
                  walk(filepath,target);
                  next();
              }
              else
              {
                 next();
              }
              return;
           }
           utils.showInfo(sourcePath,"Success!");
     };

        next();
}

exports.start=start;