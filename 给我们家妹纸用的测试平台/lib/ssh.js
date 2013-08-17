/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-20
 * Time: 下午5:52
  */
 var Connection = require('ssh2');
 function sshConnect(conn, readyFn) {
 	this.conn = conn || {
 		host : '192.168.100.100',
 		port : 22,
 		username : 'frylock',
 		privateKey : require('fs').readFileSync('/here/is/my/key')
 	};
 	this.connection = null;
 }
 sshConnect.prototype = {
 	init : function () {
 		var c = new Connection();
 		c.connect(this.conn);
 		this.connection = c;
 		c.on('connect', function () {
 			console.log('Connection :: connect');
 		});
 		c.on('ready', function () {
			console.log('ready')
		});
 		c.on('error', function (err) {
 			console.log('Connection :: error :: ' + err);
 		});
 		c.on('end', function () {
 			console.log('Connection :: end');
 		});
 		c.on('close', function (had_error) {
 			console.log('Connection :: close');
 		});

 		return c

 	}
 	exec : function (state,callback) {

 		this.connection.exec(state, function (err, stream) {
 			if (err)
 				throw err;
 			stream.on('data', function (data, extended) {
 				console.log((extended === 'stderr' ? 'STDERR: ' : 'STDOUT: ')
 					 + data);
					 callback&&callback.call(this,data);
 			});
 			stream.on('end', function () {
 				console.log('Stream :: EOF');
 			});
 			stream.on('close', function () {
 				console.log('Stream :: close');
 			});
 			stream.on('exit', function (code, signal) {
 				console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
 				c.end();
 			});
 		});

 	}
 }
 exports.ssh = sshConnect;



