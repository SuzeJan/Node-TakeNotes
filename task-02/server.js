var http = require('http');

var server = http.createServer(function(req, res) {
    // console.log('有人访问!');
    console.log(req);
    res.write('Hello World!');
    res.end();
});

server.listen(80);