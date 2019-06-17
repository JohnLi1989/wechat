
exports.tpl = (type,from,to,content,title,picurl,url) => {
    return `<xml>
            <ToUserName><![CDATA[${from}]]></ToUserName>
            <FromUserName><![CDATA[${to}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            ${diffType(type,content,title,picurl,url)}
            </xml>`;
}

function diffType(type,content,title,picurl,url){
    if(type==='text'){
        return `<MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${content}]]></Content>`;
    }else if(type==='image'){
        return `<MsgType><![CDATA[image]]></MsgType>
                <Image>
                <MediaId><![CDATA[${content}]]></MediaId>
                </Image>`;
    }else if(type==='voice'){
        return ``;
    }else if(type==='video'){
        return ``;
    }else if(type==='music'){
        return ``;
    }else if(type==='news'){
        return `<MsgType><![CDATA[news]]></MsgType>
                <ArticleCount>1</ArticleCount>
                <Articles>
                <item>
                <Title><![CDATA[${title}]]></Title> 
                <Description><![CDATA[${content}]]></Description>
                <PicUrl><![CDATA[${picurl}]]></PicUrl>
                <Url><![CDATA[${url}]]></Url>
                </item>
                </Articles>`;
    }
}