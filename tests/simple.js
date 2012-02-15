
/*!
 * Knot
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('../'),
    net = require('net'),
    port = 5000;

knot.createServer(
//    knot.profiler()
//    knot.echo()
).listen(port);

function test (port, ip, obj, callback){
    var buffer = '';
    var client = net.connect(port, ip, function() {
        client.write(JSON.stringify(obj)+knot.TERM);
    });
    client.on('data', function(data) {
        buffer+= data;
    });
    client.on('end', function() {
        var data;
        try{
            data = JSON.parse(buffer);
        }catch(e){
            data = {error:'bad json parse'};
        }
        callback(data);
    });
}

var count = port,
    start = new Date().getTime(),
    i;

for(i=0;i<port;i++){
    test(port, 'localhost', {num:i}, function(msg){
        log(msg);
    });
}

function log (msg){
    if(!--count){
        console.log('Total: '+((new Date().getTime()-start)/1000)+'sec ('+port+' requests)');
        process.exit();
    }else{
//        console.log(msg);
    }
}