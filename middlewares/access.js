const sha1 = require('sha1');
const getRawBody = require('raw-body');
const Wechat = require('../libs/wechat');
const parseXML = require('../libs/parseXML');
const tpl = require('../libs/tpl');
const menu = require('../libs/menu');

const actressModel = require('../models/actress');
const actress = require('../controllers/actress');

module.exports = (opt) => {
    var wechat = new Wechat(opt);
    return function *(next){
        var token = opt.Token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var echostr = this.query.echostr;
        var str = [token,timestamp,nonce].sort().join('');
        var sha = sha1(str);

        wechat.deleteMenu().then( () => wechat.createMenu(menu)).then( (msg) => console.log('----',msg));

        //var self = this;
        if(this.method === 'GET'){

            if(sha === signature){
                this.body = echostr+'';
            }else{
                this.body = 'error';
            }
        }else if(this.method === 'POST'){
            if(sha !== signature){
                this.body = 'error';
                return false;
            }
            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'2mb',
                encoding:this.charset
            });
            var json = yield parseXML.parseXMLAsync(data.toString());
            var msg = json.xml;
            if(msg.MsgType == 'event'){
                console.log('event');
                if(msg.Event == 'subscribe'){
                    //var data = yield wechat.getMaterialCount();

                    this.status = 200;
                    this.type = 'application/xml';
                    this.body = tpl.tpl('text',msg.FromUserName,msg.ToUserName,'欢迎来到番号之家,功能正在完善中,敬请期待') || '';
                }else if(msg.Event == 'CLICK'){
                    if(msg.EventKey == 'qufan'){
                        console.log('qufan');
                        this.status = 200;
                        this.type = 'application/xml';
                        this.body = tpl.tpl('text',msg.FromUserName,msg.ToUserName,'输入女星名字,即可得到一部随机的作品番号') || '';
                    }else if(msg.EventKey == 'oldfan'){
                        console.log('oldfan');
                        var options = {
                            type:'news',
                            offset:0,
                            count:5
                        }
                        var material = yield wechat.getMaterialList(options);
                        var count = yield wechat.getMaterialCount();
                        var newscount = count.news_count;
                        var random = Math.floor(Math.random()*(0-newscount)+newscount);
                        var data = yield wechat.getMaterial(material.item[random].media_id);
                        data = data.news_item[0];
                        this.status = 200;
                        this.type = 'application/xml';
                        this.body = tpl.tpl('news',msg.FromUserName,msg.ToUserName,data.digest,data.title,data.thumb_url,data.url) || '';
                    }
                }
            }else if(msg.MsgType == 'text'){
                console.log(msg);
                // this.status = 200;
                // this.type = 'application/xml';
                // this.body = tpl.tpl('text',msg.FromUserName,msg.ToUserName,'功能开发中,尽请期待!') || '';
                var name = msg.Content
                var data = yield actressModel.get(name);

                console.log(data)
                if(!data){
                    this.status = 200;
                    this.type = 'application/xml';
                    this.body = tpl.tpl('text', msg.FromUserName, msg.ToUserName, '该女星的资料正在添加中...') || '';
                }else{
                    var name = data.c_name;
                    var xiongwei = data.sanwei.xiongwei;
                    var yaowei = data.sanwei.yaowei;
                    var tunwei = data.sanwei.tunwei;
                    var count = data.drama.length;
                    var num = Math.floor(Math.random()*(0-count)+count);
                    var fanhao = data.drama[num];
                    this.status = 200;
                    this.type = 'application/xml';
                    this.body = tpl.tpl('text', msg.FromUserName, msg.ToUserName, `女星:${name}\n胸围:${xiongwei}\n腰围:${yaowei}\n臀围:${tunwei}\n识别码:${fanhao.fanhao}\n作品名称:${fanhao.name}\n发行时间:${fanhao.time}\n时长:${fanhao.long}\n类型:${fanhao.type.join(',')}`) || '';
                }

            }
        }

    }
}
