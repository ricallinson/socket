var knot = require('../'),
    net = require('net'),
    microtime = require('microtime'),
    port = 5000;

knot.createServer(
    knot.echo()
).listen(port);

function test (port, ip, obj, callback){
    var buffer = '';
    var client = net.connect(port, ip, function() {
        client.write(JSON.stringify(obj)+'\r\n');
    });
    client.on('data', function(data) {
        buffer+= data.toString();
    });
    client.on('end', function() {
        callback(JSON.parse(buffer));
    });
}

var count = port,
    start = microtime.now(),
    i;

for(i=0;i<port;i++){
    test(port, 'localhost', {num:i}, function(msg){
        log(msg);
    });
}

function log (msg){
    if(!--count){
        console.log('Total: '+(microtime.now()-start)+' ('+count+')');
    }
}