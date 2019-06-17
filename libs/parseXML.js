const xml2js = require('xml2js');
const Promise = require('bluebird');

exports.parseXMLAsync = (xml) => {
    return new Promise( (resolve,reject) => {
       xml2js.parseString(xml,{trim:true,explicitArray:false,ignoreAttrs:true},(err,json) => {
            if(err){
                reject(err);
            }else{
                resolve(json);
            }
       });
    });
}

/*unction formatJSON(result){
    var msg = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(let i=0;i<keys.length;i++){
            var value = result[keys[i]];
            var key = keys[i];
        }
    }
}
exports.formatJSON = (json) => {
}*/