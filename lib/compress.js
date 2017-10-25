"use strict";
const https=require("https");
const fs=require("fs");
const STATUS_CODES = require('http').STATUS_CODES;
const utils=require("./utils");

const KEY="j5JatlrmK2uFYJlI0XCwk-tY8euDQr_8";

function compress(src,target,key,callback){
   fs.createReadStream(src).pipe(https.request({
      hostname: 'api.tinypng.com',
      path: '/shrink',
      method: 'POST',
      auth: 'api:' +(key||KEY)
   })).on("error",onError).on("response",function(response){
         var data="";
         response.on("data",function(chunk){
             data+=chunk;
         }).on("end",function(){
             var json=JSON.parse(data),
                 inputSize=json.input.size,
                 outputSize=json.output.size;
                
                 console.log(" "+outputInfo(src,inputSize));
                 utils.showSuccess(outputInfo(target,outputSize));
                 utils.showDividingLine(50);
         });
        onComplete(response,target,callback);
   });
}

function onError(err){
    utils.showError(err.message);
}

function onComplete(response,target,callback){
    console.log("complete");
   if(response.statusCode===201)
   {
       https.get(response.headers.location).on('error',onError).on('response', function(res) {
          if(res.statusCode=== 200){
              res.pipe(fs.createWriteStream(target)).on('error',onError).on('finish',function(){callback&&callback()});
          }
          else
          {
             onError(STATUS_CODES[response.statusCode]);
          }          
        });
   }
   else
   {
       onError(STATUS_CODES[response.statusCode]);
   }
}

function outputInfo(src,size){
   var info=src;
     info+=" ";
     info+=(size<2014?size+"B":(size/1024).toFixed(2)+"KB");

     return info;
}

module.exports=compress;