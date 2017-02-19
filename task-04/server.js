/**
 * Created by xiaoxu on 2017/2/18.
 */
const http = require('http');

http.createServer(function(req, res) {
    // 请求成功时req.url ==> /test?user=suze&password=123456
    console.log(req.url);
    var GET = {};
    var url = '';

    if (req.url.indexOf('?') != -1) {
        // 存的地址: arr[0] ==> test
        // 存的数据: arr[1] ==> user=suze&password=123456
        var arr = req.url.split('?');

        GET = {};
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

    console.log(url, GET);

    res.write('请求成功！');
    res.end();
}).listen(80);