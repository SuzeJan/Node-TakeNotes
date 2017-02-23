/**
 * Created by xiaoxu on 2017/2/20.
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

http.createServer(function(req, res) {
    // 获取GET数据
    var obj = urlLib.parse(req.url, true);
    // 获取路径
    var url = obj.pathname;
    // 获取数据
    const GET = obj.query;

    // 获取POST数据
    var str = '';
    req.on('data', function(data) {
        str += data;
    });

    req.on('end', function() {
       const POST = querystring.parse(str);
        /*
         * 获取到了三个数据：
         *   1、URL地址
         *   2、GET数据
         *   3、POST数据
         * */
        console.log(url, GET, POST);

        var fileName = './www' + url;
        fs.readFile(fileName, function(err, data) {
            if (err) {
                res.write('页面未找到 404!');
            } else {
                res.write(data);
            }
            res.end();
        });
    });


}).listen(80);