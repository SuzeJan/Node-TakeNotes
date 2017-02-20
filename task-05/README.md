# 数据请求之post请求方式

- post相比get之下，容量、安全性等都有很大的提升
- get<32k，而post则有1G的传输量
> 传输量的不同在传输的方式上有很大的不同

#### 在POST方式下，通过req.on()方法执行两个事件
- ```.on('data', function() {})```
- ```.on('end', function() {})```
> 为什么会有两个事件来处理POST传送的数据呢？

1. data是接收的数据，每次data到达时就执行回调函数，并且对数据分段发送(取决数据量)
    > 分段的原因
    
    - 如果数据量很大一整块发送，会造成堵塞
    - 如果某整块数据出现一丁点数据丢失，则整块都得重发
2. end表示数据全部到达

#### 需要处理三个问题
1. 把分段数据拼起来
2. 验证数据是否分段发送的
3. 数据发送的是否无误

```javascript
const http = require('http');
http.createServer(function(req, res) {
    var str = '';
    var i = 0;
    // 数据到达
    req.on('data', function(data) {
        // 拼接分段数据，解决问题1，但是这里严格来时这样处理不太可行
        str += data;
        // 验证是否分段发送
        console.log(`第${i++}次接收数据`);
    });
    // 数据完成
    req.on('end', function() {
        // 返回user=xiaoxu&password=123456，解决问题3
        console.log(str);
    })
}).listen(80);
```
> 那么问题来了，如何验证是否分段发送
- 通过在form表单内，在textarea标签里传送大量字符来验证

通过querystring()来处理POST传送的数据

##总结
- post传输量可以很大，太大时传输时一段一段传输
- 通过```.on('data', function(data){})```来监听正在传输的数据
- 通过```.on('end', function() {})```来监听数据传输完毕
- 分段传输时要合并数据