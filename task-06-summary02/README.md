# 用户注册、登录

> 前后台数据交互，首先考虑的是制定接口

> 登录: 去保存的数据里找

> 注册: 将数据存起来

前台请求:
- /user?type=reg&user=xxx&password=xxx
- /user?type=login&user=xxx&password=xxx
  - reg表示注册
  - login表示登录

后台响应:
- {'errno': true, 'msg': '原因'}
- {'errno': false, 'msg': '原因'}

> 问题来了，当前台请求时可能是请求的文件，可能是接口等多种情况
- http://localhost/index.html
- http://localhost/1.jpg
- http://localhost/user?type=xxx... 只有这种才是我们制定的登录、注册接口
```javascript
// 所以需要判断一下到底是请求文件还是请求接口
if (url == '/user') { // 请求登录、注册接口
    // ...
    // 判断是登录还是注册
    switch(GET.type || POST.type) {
        case 'reg':
            // ...
            // 既然要注册，肯定先判断用户名是否已存在
            // 不存在就在插入users = {} (当然正式情况肯定是用数据库，这里做练习)
            // 存在的话，提醒用户已存在
            break;
        case 'login':
            // ...
            // 既然要登录，去找users = {}是否有用户
            // 有此用户还需要验证密码
            // 登录
            // 没有就提醒去注册
            break;
        default:
            // 请求的不是登录也不是注册
            break;
    }
} else {              // 请求文件
    // ...
    var fileName = './www' + url;
                fs.readFile(fileName, function(err, data) {
                    if (err) {
                        res.write('404');
                    } else {
                        res.write(data);
                    }
                    res.end();
                });// 请求文件
}
```

