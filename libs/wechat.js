const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const prefix = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
    accessToken : prefix + 'token?grant_type=client_credential',
    getMaterialList: prefix + 'material/batchget_material?',
    getMaterialCount: prefix + 'material/get_materialcount?',
    getMaterial: prefix + 'material/get_material?',
    createMenu: prefix + 'menu/create?',
    getMenu: prefix + 'menu/get?',
    deleteMenu: prefix + 'menu/delete?',
    semantic : 'https://api.weixin.qq.com/semantic/semproxy/search?'
}

class Wechat{

    constructor(opt){
        this.AppID = opt.AppID;
        this.AppSecret = opt.AppSecret;
        this.getAccessToken = opt.getAccessToken;
        this.saveAccessToken = opt.saveAccessToken;
        this.fetchAccessToken();

    }

    fetchAccessToken() {
        if(this.access_token && this.expires_in){
            if(this.isValidAccessToken(this)){
                return Promise.resolve(this);
            }
        }
        this.getAccessToken()
            .then((data) => {
                try{
                    data = JSON.parse(data);
                }catch (e){
                    return this.updateAccessToken();
                }

                if(this.isValidAccessToken(data)){
                    return Promise.resolve(data);
                }else{
                    return this.updateAccessToken();
                }
            })
            .then((data) => {
                this.access_token = data.access_token;
                this.expires_in = data.expires_in;
                this.saveAccessToken(data);
                return Promise.resolve(data);
            });
    }

    isValidAccessToken(data) {
        if(!data || !data.access_token || !data.expires_in){
            return false;
        }
        var access_token = data.access_token;
        var expires_in = data.expires_in;
        var now = Date.now();
        if(now < expires_in){
            return true;
        }else{
            return false;
        }
    }

    updateAccessToken() {
        var appid = this.AppID;
        var secret = this.AppSecret;
        var url = api.accessToken + '&appid=' + appid + '&secret=' + secret;
        return new Promise( (resolve,reject) => {
            request({url:url,json:true}, (err, res, body) => {
                var data = body;
                var now = Date.now();
                var expires_in = now + (data.expires_in - 20) * 1000;
                data.expires_in = expires_in;
                console.log(data);
                resolve(data);
            });
        });
    }

    getMaterial(mid) {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                   var url = `${api.getMaterial}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'post',body:{media_id:mid}}).then( (res) => {
                        var data = res.body;
                        resolve(data);
                    });
                });

        });
    }

    getMaterialList(options) {
        options.type = options.type || 'news';
        options.offset = options.offset || 0;
        options.count = options.count || 1;
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.getMaterialList}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'post',body:options}).then( (res) => {
                        var data = res.body;
                        resolve(data);
                    });
                });

        });
    }

    getMaterialCount() {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.getMaterialCount}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'get'}).then( (res) => {
                        var data = res.body;
                        resolve(data);
                    });
                });

        });
    }

    createMenu(menu) {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.createMenu}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'post',body:menu}, (err, res, body) => {
                        var data = body;
                        resolve(data);
                    });
                });

        });
    }

    getMenu() {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.getMenu}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'post'}, (err, res, body) => {
                        var data = body;
                        resolve(data);
                    });
                });

        });
    }

    deleteMenu() {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.deleteMenu}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'get'}, (err, res, body) => {
                        var data = body;
                        resolve(data);
                    });
                });

        });
    }

    semantic(para) {
        return new Promise( (resolve,reject) => {
            this
                .fetchAccessToken()
                .then( (data) => {
                    var url = `${api.semantic}access_token=${data.access_token}`;
                    request({url:url,json:true,method:'post',body:para}).then( (res) => {
                        var data = res.body;
                        resolve(data);
                    });
                });

        });
    }
}

module.exports = Wechat;