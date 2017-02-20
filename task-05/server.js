/**
 * Created by xiaoxu on 2017/2/20.
 */
const http = require('http');

http.createServer(function(req, res) {

    var str = '';
    var i = 0;

    req.on('data', function(data) {
        console.log(`第${i++}次接收数据`);
        str += data;
    });

    req.on('end', function() {
        console.log('done');
    })
}).listen(80);