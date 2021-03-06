/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-22
 * Time: 下午5:35
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
function getData(options, callback) {
    // console.log("Starting get NatureVal @"+data);
    var options = options || {
        host:'192.168.1.6',
        port:7379,
        path:'/MGET/123456:cellphonenumber/',
        method:'get',
    };
    var req = http.get(options, function (res) {
        var rec_leng = 0;
        var rec_ary = [];
        res.on('error',function (e) {
            console.log("Got error: " + e.message);
        }).on('data',function (chunk) {
                rec_leng += chunk.length;
                rec_ary.push(chunk);
                /*
                 * if(rec_leng > postLimit){
                 rec_ary = null;
                 req.connection.destroy()
                 }
                 * */
            }).on('end', function () {
                var buf =  Buffer.concat(rec_ary, rec_leng);
                var result = buf.toString();
                callback.call(this, result);
            })
    });
    req.on('error', function (e) {
        console.log("Got error: " + e.message)
    })
}
exports.getData = getData;