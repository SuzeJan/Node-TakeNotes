/**
 * Created by xiaoxu on 2017/2/19.
 */
const http = require('http');
const querystring = require('querystring');

http.createServer(function(req, res) {
    var GET = {};
    var url = '';

    if (req.url.indexOf('?') != -1) {
        var arr = req.url.split('?');
        url = arr[0];

        GET = querystring.parse(arr[1]);
    } else {
        url = req.url;
    }
    // 在Chrome浏览器下，会返回/test { user: 'suze', password: '123456' } 和 /favicon.ico {}
    console.log(url, GET);

    res.write('请求成功！');
    res.end();
}).listen(80);