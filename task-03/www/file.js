/**
 * Created by xiaoxu on 2017/2/18.
 */

const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {

    var fileName = './www' + req.url;


    fs.readFile(fileName, function(err, data) {
        if (err) {
            res.write('页面没找到 404！')
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(80);

/*fs.writeFile('data.txt', '写入信息', function(err) {
    console.log(err);
});*/
