#!/usr/bin/env node

var args=process.argv,
    len=args.length,
    key=null;

if(len===3){
    key=args[2];
}
else if(args[2]==="-k"||args[2]==="--key")
{
    key=args[3];
}

require("../lib/").start(process.cwd(),key);

