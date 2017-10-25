
const utils={
    extend:function(target,source){
        var k,prop,isArray=Array.isArray;
        for(k in source){
           prop=source[k];
           if(target[k]===prop){
               continue;
           }
          typeof prop==="object"?this.extend(target[k]=isArray(prop)?[]:{},prop):target[k]=prop;
        }
        return target;
    },
    showSuccess:function(field,msg){
        if(arguments.length===1)
        {
           msg=field;
           field="";
        }
        console.log(field+"\x1b[1m\x1b[32m "+msg+" \x1b[0m");
    },
    showInfo:function(field,msg){
        if(arguments.length===1)
        {
           msg=field;
           field="";
        }
        console.log(field+"\x1b[1m "+msg+" \x1b[0m");
    },
    showError:function(err)
    {
       console.log("\x1b[1m\x1b[31m "+err+" \x1b[0m"); 
    },
    showDividingLine:function(len,char){
        console.log(Array(len).join(char||"-"));
    }    
};


module.exports=utils;