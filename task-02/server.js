var http = require('http');

var server = http.createServer(function(req, res) {
    // console.log('有人访问!');
    // res.write('Hello World!');
    switch (req.url) {
        case '/index.html':
            res.write('这是主页');
            break;
        case '/about.html':
            res.write('这是关于');
            break;
        default:
            res.write('404页面');
            break;
    }

    res.end();
});

server.listen(80);