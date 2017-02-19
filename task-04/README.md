# 数据请求之get请求方式

> 前台数据请求如何获得数据？
- 对于前台请求方式: form、ajax、jsonp等等
- 对于后台: 都是一样
- 但是无论是前台还是后台，都是通过http协议发送或接收，只不过前台方式很多种

对于后台，常用的方式两种
- get: 数据在URL中一起传输
```http://localhost/?user=suze&password=123456```
- post

前台请求：\<form action="http://localhost/test" method="get"><br>
后台请求：请求的数据就在req.url中，数据就是"/test?user=suze&password=123456"

> 方法一: 最笨的方式获取到请求信息
```javascript
http.createServer(function(req, res) {
    // 请求成功时req.url ==> /test?user=suze&password=123456
    console.log(req.url);
    var GET = {};
    var url = '';
    
    if (req.url.indexOf('?') != -1) {
        // 存的地址: arr[0] ==> test
            // 存的数据: arr[1] ==> user=suze&password=123456
            var arr = req.url.split('?');
            url = arr[0];
            // 存的用户名: userData[0] ==> user=suze
            // 存的密码: userData[1] ==> password=12346
            var userData = arr[1].split('&');
            
            for (var i = 0; i < userData.length; i++) {
                // temp[0] ==> user
                // temp[1] ==> suze
                var temp = userData[i].split('=');
                
                GET[temp[0]] = temp[1];
            }
    } else {
        url = req.url;
    }
    // 在Chrome浏览器下，会返回/test { user: 'suze', password: '123456' } 和 /favicon.ico {}
    console.log(url, GET);

    res.write('请求成功！');
    res.end();
}).listen(80);
```

> 方式二: 利用nodeJS封装的querystring()方法
```javascript
const  querystring = require('querystring');
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
```

> 方式三: 利用nodeJS封装的URL()方法
```javascript
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
```