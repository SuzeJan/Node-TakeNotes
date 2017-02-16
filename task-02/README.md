# 搭建一个简单的本地服务器

我们知道，开启一个本地服务器，实现浏览器与服务器之间的通信，需要遵循HTTP协议，而HTTP在Node里面作者已经完成了封装，可以直接使用Node里面的HTTP模块来完成搭建

> 首先把Node封装的http模块加载进来
``` javascript
// 引用http模块
const http = require('http');
```

> 调用http模块的 ```createServer()```方法开启服务
```javascript
// 调用createServer()方法来启动服务
// 接收一个回调函数，每当访问时就会调用回调函数
// 回调函数接收两个参数，requirs和response
// requirs: 请求，表示向服务器发送数据
// response: 响应，表示服务器向浏览器数据
var server = http.createServer(function(req, res) {
    console.log('有人访问!');
    // 向浏览器发送
    res.write('Hello World!');
    // 响应结束
    res.end();
});
```
> 监听服务端口```listen()方法```
```javascript
// 监听80端口
server.listen(80);
```

> 查看req.url有哪些信息
```javascript
var server = http.createServer(function(req, res) {
    console.log(req.url);
});
```