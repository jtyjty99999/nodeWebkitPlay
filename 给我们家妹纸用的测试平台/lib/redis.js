/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: 下午5:52
  */
var mredis = require('mredis');
function redisConn(conn, readyFn) {
	this.conn = conn || {
		server : ['127.0.0.1:1240', '127.0.0.1:1239'], //redis server addresses
		debug : false, //debug info, default false
		speedFirst : true, // 如果为true，则每次读取都会选择从redis集群中响应最快的服务读取，反之，则会对所有集群进行轮询(负载均衡)。
		pingInterval : 3000, //the interval for ping. default 3000ms 对每个redis服务进行心跳检测
		reqTimeout : 3000 //request timeout. default 3000ms       所有的redis请求的超时设置
	};
	this.connection = null;
}
redisConn.prototype = {
	init : function () {
		var redis = mredis.createClient(this.conn);
		this.connection = redis;
		return redis

	},
	get : function (key, callback) {
		this.connection.get(key, function (err, data) {
			console.log('data'); // world
		});
		callback && callback.call(this, data, error)

	}
}
exports.redis = redisConn;



