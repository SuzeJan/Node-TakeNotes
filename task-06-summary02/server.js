/**
 * Created by xiaoxu on 2017/2/21.
 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var users = {}; // 保存用户数据{'user1': 'passwd', 'user2': 'passwd'};

http.createServer(function(req, res) {
    // 解析数据
    var str = '';
    req.on('data', function(data) {
        str += data;
    });
    req.on('end', function() {
        // GET数据
        var obj = urlLib.parse(req.url, true);
        const url = obj.pathname;
        const GET = obj.query;
        // POST数据
        const POST = querystring.parse(str);

        if (url == '/user') { // 请求登录、注册接口
            console.log(str);
            switch (GET.type) {
                case 'reg':
                    // 检查用户名是否存在
                    console.log(GET.user);
                    if (GET.user == '' || GET.password == '') {
                        res.write('{"errno": false, "msg": "用户名或密码为空"}');
                    } else if (users[GET.user]) {
                        // 用户名存在则响应提示
                        res.write('{"errno": false, "msg": "此用户已存在"}');
                    } else {
                        // 不存在则在users = {} 添加key值
                        users[GET.user] = GET.password;
                        res.write('{"errno": true, "msg": "注册成功"}');
                    }
                    break;
                case 'login':
                    // 检查用户是否存在
                    if (GET.user == '' || GET.password == '') {
                        res.write('{"errno": false, "msg": "用户名或密码为空"}');
                    } else if (GET.password != users[GET.user]) {  // 检查密码是否正确
                        res.write('{"errno": false, "msg": "用户或密码不正确"}')
                    } else {
                        res.write('{"errno": true, "msg": "登陆成功"}');
                    }
                    break;
                default:
                    res.write('{"errno": false, "msg": "未知的type"}');
                    break;
            }
            res.end();
        } else {
            //读取数据
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
    });


}).listen(80);