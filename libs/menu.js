
module.exports = {
    'button': [
        {
            'name': '取番',
            'type': 'click',
            'key' : 'qufan'
        },
        {
            'name': '往期推荐',
            'type': 'click',
            'key' : 'oldfan'
        },
        {
            'name': '更多',
            'sub_button': [
                {
                    'name':'如何使用番号',
                    'type':'view',
                    'url':'http://mp.weixin.qq.com/s?__biz=MzI4MTAzOTY3OA==&mid=2247483706&idx=2&sn=d8baf6965f0fe77bb0188f28ab7089cd&scene=0#wechat_redirect'
                },
                {
                    'name':'上车了',
                    'type':'view',
                    'url':'https://btso.pw/search/'
                }
            ]
        },
    ]
}