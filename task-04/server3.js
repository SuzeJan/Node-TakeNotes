/**
 * Created by xiaoxu on 2017/2/19.
 */
const http = require('http');
const urlLib = require('url');

http.createServer(function(req, res) {
    var obj = urlLib.parse(req.url, true);

    var GET = obj.query;
    var url = obj.hostname;
    // 在Chrome浏览器下，会返回/test { user: 'suze', password: '123456' } 和 /favicon.ico {}
    console.log(url, GET);

    res.write('请求成功！');
    res.end();
}).listen(80);
