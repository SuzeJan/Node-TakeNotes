# 搭建一个简单的本地服务器

我们知道，开启一个本地服务器，实现浏览器与服务器之间的通信，需要遵循HTTP协议，而HTTP在Node里面作者已经完成了封装，可以直接使用Node里面的HTTP模块来完成搭建

- 首先把Node封装的http模块加载进来
``` javascript
// 引用http模块
const http = require('http');
```

- 调用http模块的 ```createServer()```方法开启服务
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
- 监听服务端口```listen()方法```
```javascript
// 监听80端口
// 让用户可以访问
server.listen(80);
```

- 查看req.url有哪些信息
```javascript
var server = http.createServer(function(req, res) {
    console.log(req.url);
});
```
在Chrome里面，输入localhost/index.html，这是会向服务器请求index.html这个url链接，而console.log会在服务端输出这个请求链接
```
/index.html
/favicon.ico
```
> 注意：之所以会请求到favicon.ico是因为Chrome的原因，Chrome会默认请求这个文件

- 获取了请求的链接，可以对不同的页面响应不同的数据
```javascript
var server = http.createServer(function(req, res) {
    switch(req.url) {
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
});
```
> 当然上面只是作为演示，真实环境可不能这样干，子页面多的话岂不奔溃

## 总结
搭建一个简单的本地服务器，分为以下步骤:
====================================
- 引入http模块 ```require('http')```
- 开启服务
    ```javascript 
    createServer(function(){ // 执行代码 })
    ```
    - 回调函数接收两个参数，requirs和response
    - res: 请求数据
    - req: 响应数据
- 监听端口 ```listen()```