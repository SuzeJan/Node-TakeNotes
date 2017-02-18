# 理解文件系统模块
如果每次都是像task-02中提到通过case来判断文件，不方便也很麻烦，所以可以观察wampServer软件里面，都会通过一个叫做 www 的目录，所有文件读写操作都对此目录操作

```javascript
// 引入file system模块
const fs = require('fs');
```

```javascript
// 调用readFile()方法读取文件
// 接收两个参数，读取的文件名、一个回调函数
// 回调函数接收两个参数
// error: 反馈信息
// data: 返回数据
fs.readFile('data.txt', function(err, data) {
    if (err) {
            console.log(err);
        } else {
            console.log(data.toString());
        }
})
```

```javascript
fs.writeFile('data.txt', '写入信息', function(err) {
  console.log(err);
});
```
> 注意: 如果文件不存在就会报错误，存在就会返回null

- ####这里文件的操作分为异步和同步
  - 异步: 多个操作可以同时进行
  - 同步: 一次进行一个
  
- 结合上次简单的服务器操作文件
```javascript
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
    // 这里有个坑，这里在浏览器中输入localhost还没输完就会发生报错，为什么呢？
    //因为这里读取文件是异步的，也就是在读取时不会等到读取完就会执行下面的res.end()，所以注释下面，把res.end()放在readFile()方法去
    // res.end();
});
server.listen(80);
```

- 在浏览器里输入http://localhost/data.txt，会返回hello world!
- 在浏览器里输入http://localhost/index.html，会返回这个页面

> 注意: 这时在www新添加文件时，服务器不需要重启，浏览器那边也是可以访问的，这就解决了之前用switch语句写在开启服务器文件内部里，要想生效就得重启

## 总结
- 熟悉了文件系统模块的基本使用
- 完成了添加一个本地www目录，只对目录添加文件，访问和读取
- 不需要再服务器文件内部操作，不用重启web服务器
- 引入fs文件系统模块```require('fs')```
- 异步读取文件```readFile(fileName, callback)```
- 异步写入文件```writeFile(fileName, fileData, callback)```