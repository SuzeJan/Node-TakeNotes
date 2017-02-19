# 数据请求之get请求方式

> 前台数据请求如何获得数据？
- 对于前台请求方式: form、ajax、jsonp等等
- 对于后台: 都是一样
- 但是无论是前台还是后台，都是通过http协议发送或接收，只不过前台方式很多种

对于后台，常用的方式两种
- get: 数据在URL中一起传输```http://localhost/?user=suze&password=123456```
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
    var url = obj.pathname;
    // 在Chrome浏览器下，会返回/test { user: 'suze', password: '123456' } 和 /favicon.ico {}
    console.log(url, GET);

    res.write('请求成功！');
    res.end();
}).listen(80);
```

## 总结
- 前台通过form、ajax、jsonp等方式来请求，但是后台常用就是GET、POST两者
- 后台通过GET，数据是通过url来发送的，所以需要通过手段来把url里面的数据截出来
- 自己可以通过.split()来截，但是通过nodeJS封装的方法更为方便、快捷
  - querystring()方法只能截取指定格式的(user=123&password=123类似这样)，如果数据内有地址，比如/test?user=123&password=123此方法就无能为力了
  - url()方法，他可以解析一个完整的地址，比如```'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'```
    - url.parse(url)，上面链接被解析如下
    ```javascript
    Url {
      protocol: 'http:',
      slashes: true,
      auth: 'user:pass',
      host: 'host.com:8080',
      port: '8080',
      hostname: 'host.com',
      hash: '#hash',
      search: '?query=string',
      query: 'query=string',
      pathname: '/p/a/t/h',
      path: '/p/a/t/h?query=string',
      href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
    }
    ```
    > 如果url.parse(url, ture)，第二个参数设置true，Url.query属性值就是JSON对象{'query': string}