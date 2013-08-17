/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: ����5:52
  */
var mredis = require('mredis');
function redisConn(conn, readyFn) {
	this.conn = conn || {
		server : ['127.0.0.1:1240', '127.0.0.1:1239'], //redis server addresses
		debug : false, //debug info, default false
		speedFirst : true, // ���Ϊtrue����ÿ�ζ�ȡ����ѡ���redis��Ⱥ����Ӧ���ķ����ȡ����֮���������м�Ⱥ������ѯ(���ؾ���)��
		pingInterval : 3000, //the interval for ping. default 3000ms ��ÿ��redis��������������
		reqTimeout : 3000 //request timeout. default 3000ms       ���е�redis����ĳ�ʱ����
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



