const actressModel = require('../models/actress');

exports.addActress = function *(next) {
   console.log("add -----")
   var query = {
      c_name:'波多野结衣',
      j_name:'波多野結衣',
      birthday:'1988-05-24',
      cup:'D',
      sanwei:{
         xiongwei:'88cm',
         yaowei:'59cm',
         tunwei:'85cm'
      },
      headimg:'public/actress/hatano_yui.jpg',
      drama:[
         {fanhao:'WANZ-270',name:'汗だく美女と中出し性交波多野結衣',time:'2014-12-1',long:'150分钟',type:['中出','DMM独家','高画质']},
         {fanhao:'ASFB-114',name:'痴女BEST最高のテクニックで抜かれたい波多野結衣4時間',time:'2014-12-1',long:'240分钟',type:['荡妇','DMM独家','合集']},
         {fanhao:'CAGJ-008',name:'こんなにキレイなお姉さんに耳元で囁きながらチ○ポをいじくりまわされたら辛抱たまらずフル勃起！凄テクすぎて僕はもう普通のプレイじゃイケません！波多野結衣',time:'2014-11-25',long:'105分钟',type:['荡妇','DMM独家']},
         {fanhao:'GVG-066',name:'ママのリアル性教育波多野結衣',time:'2014-11-20',long:'125分钟',type:['乱伦','高画质','母亲']},
         {fanhao:'VEQ-065',name:'S級熟女コンプリートファイル波多野結衣4時間其之弐',time:'2014-11-13',long:'242分钟',type:['熟女','DMM独家']},
         {fanhao:'NHDTA-602',name:'手錠の鍵は波多野結衣のマ○コの中下半身丸出しの美人妻に「鍵を取って下さい」と助けを求められたら犯さずにいれますか？',time:'2014-11-8',long:'120分钟',type:['强奸','高画质','羞耻']},
         {fanhao:'IENE-482',name:'波多野結衣×本物素人童貞筆おろし解禁！！',time:'2014-11-8',long:'123分钟',type:['骚扰','高画质','恋物癖']},
         {fanhao:'PGD-730',name:'誘惑女教師～妖艶タイトスカート編～波多野結衣',time:'2014-11-7',long:'120分钟',type:['女教师','高画质','DMM独家']},
         {fanhao:'DYNC-006',name:'台湾モデルリン?チ○リン激似で大人気の「波多野結衣」ちゃんがオマ○コで誘惑するので僕のチ○ポはもうハチキレそうです。',time:'2014-11-1',long:'110分钟',type:['淫语','荡妇','DMM独家']},
         {fanhao:'SUPD-122',name:'DIGITALCHANNELDC122波多野結衣',time:'2014-11-1',long:'240分钟',type:['潮吹','颜射','高画质']},
         {fanhao:'GWAZ-062',name:'大人ボディが辛抱たまらん人妻を無理矢理レイプ！嫌がってるはずなのにイヤらしい声を出しちゃう奥さんにチ○ポびんびんな俺はドロドロの精子をキレイな顔にぶっかけてやった！波多野結衣4時間',time:'2014-10-25',long:'245分钟',type:['高画质','强奸','已婚妇女']},
         {fanhao:'JUSD-588',name:'丸ごと！波多野結衣8時間～ここでしか見れない未公開SEXもуh！＋',time:'2014-10-25',long:'480分钟',type:['合集','已婚妇女','DMM独家']},
         {fanhao:'HFD-135',name:'ねぇ、もしかして君って…チクビでもイケちゃう男子？ 4時間 波多野結衣',time:'2016-8-4',long:'246分钟',type:['合集','高画质','美容院']},
         {fanhao:'MXGS-889',name:'結衣と最っ高のデートをしよう！ 波多野結衣',time:'2016-7-16',long:'138分钟',type:['情侣','高画质','口交']},
         {fanhao:'PGD-891',name:'頭のてっぺんからつま先まで快感が支配する ポルチオ大絶頂 波多野結衣',time:'2016-8-5',long:'120分钟',type:['DMM独家','高画质','潮吹']},
         {fanhao:'REAL-605',name:'自己犠牲レイプ 旦那の為なら何でもします ●員の妻 波多野結衣',time:'2016-7-8',long:'120分钟',type:['深喉','中出','熟女']},
         {fanhao:'CESD-235',name:'イチャLOVEデート2 世界で1番大切な波多野結衣',time:'2016-7-25',long:'188分钟',type:['熟女','高画质','DMM独家']},
         {fanhao:'GVG-314',name:'ズルムケ三人組の放課後H体験 波多野結衣',time:'2016-6-1',long:'132分钟',type:['多P','女教师','高画质']},
         {fanhao:'AKBS-030',name:'誘拐監禁事件 輪姦された社長令嬢 波多野結衣',time:'2016-7-1',long:'97分钟',type:['监禁','凌辱','熟女']},
      ]
   }
   yield actressModel.add(query);
   this.body = {message:'success'}

}

exports.getActress = function *(next) {
   console.log(66666)
   var name = this.query.name
   var data = yield actressModel.get(name);
   this.body = {data:data}
}