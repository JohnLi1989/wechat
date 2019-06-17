const fs = require('fs');
const Promise = require('bluebird');

exports.readFileSync = (fpath,encode) => {
    return new Promise( (resolve,reject) => {
        fs.readFile(fpath,encode,(err,content)=>{
           if(err){
               reject(err);
           } else{
               resolve(content);
           }
        });
    });
}
exports.writeFileSync = (fpath,content) => {
    return new Promise( (resolve,reject) => {
        fs.writeFile(fpath,content,(err)=>{
            if(err){
                reject(err);
            } else{
                resolve();
            }
        });
    });
}