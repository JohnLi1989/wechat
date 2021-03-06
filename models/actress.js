const mongoose = require('mongoose');
const Promise = require('bluebird');

const ActressSchema = new mongoose.Schema({
    c_name:String,
    j_name:String,
    birth:String,
    cup:String,
    sanwei:Object,
    headimg:String,
    drama:[]
});

ActressSchema.statics = {
    add(query) {
        return new Promise( (resolve,reject)=> {
            this.create(query, (error,data)=> {
                console.log(66666)
                if(error){
                  return reject(error);
              }
                resolve(data);
           });
        });
    },
    get(name) {
        return new Promise( (resolve,reject)=> {
            console.log("name--", name)
            this.findOne({$or:[{c_name:name},{j_name:name}]}, (error,data)=> {
                if(error){
                    return reject(error);
                }
                console.log("------", data);
                resolve(data);
            });
        });
    }
}

const ActressModel = mongoose.model('Actress',ActressSchema);

module.exports = ActressModel;