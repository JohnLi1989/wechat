const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
var superagent = require('superagent');

function result(fanhao){
	return new Promise( (resolve,reject)=>{

		var url = `https://btso.pw/search/${fanhao}`;
		request({url:url},(error,response,body)=>{
			//console.log(response)
			console.log('2222222')
			if(error)
				return console.log(error)
			console.log(body)
		})
		// superagent.get(url)
		// 	.end( (err,res)=>{
		// 		console.log('----------------')
		// 		if(err){
		// 			console.log(err)
		// 			return reject(err)
		// 		}
		// 		console.log(res)
		// 		var html = res.text
		// 		var $ = cheerio.load(html);
		// 		var list = [];
		// 		$('.data-list div.row').each( (i,e)=> {
		// 			var href = $(e).find('a').attr('href');
		// 			var title =  $(e).find('a').attr('title');
		// 			var size = $(e).find('div.size-date').text();
		// 			var data = {
		// 				href:href,
		// 				title:title,
		// 				size:size
		// 			}
		// 			list.push(data);
		// 		});
		// 		list.shift();
		// 		resolve(list);
		// 	});
	});
}

exports.getResult = function *(next){
	var fanhao = this.params.fanhao;
	var data = yield result(fanhao);
	console.log(data);
	yield this.render('result', {data:data});
}