
/*!
 * Knot
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('knot'),
    net = require('net'),
    microtime = require('microtime'),
    port = 8080,
    app;

app = knot.createServer(
    knot.profiler(),
    knot.echo()
).listen(port);

console.log('Knot Server Started');

function test (port, ip, obj, callback){
    var buffer = '';
    var client = net.connect(port, ip, function() {
        client.write(JSON.stringify(obj)+app.TERM);
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

var repeat = 1000,
    count = repeat,
    start = microtime.now(),
    i;

for(i=0;i<count;i++){
    test(port, 'localhost', {num:i}, function(msg){
        log(msg);
    });
}

function log (msg){
    if(!--count){
        console.log('Total: '+((microtime.now()-start)/1000000)+'sec ('+repeat+' requests)');
        process.exit();
    }else{
        console.log(msg);
    }
}