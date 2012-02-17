
/*!
 * Knot - Echo Server Example
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('knot'),
    net = require('net'),
    port = 8000,
    buffer = '',
    client,
    app,
    payload,
    schemaIn,
    schemaOut;

payload = ["abc", "def"];
schemaIn = {type: "map", values: "string"};
schemaOut = {type: "array", items: "string"};
schemaOut = {type: "map", values: "string"};

app = knot.createServer(
    knot.profiler(),
    knot.json(),
    knot.avro(schemaIn, schemaOut),
    knot.echo()
).listen(port);

// Start Test

client = net.connect(port, null, function() {
    client.write(JSON.stringify(payload)+app.TERM);
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
        console.log(buffer);
    }
    console.log("Return value: "+JSON.stringify(data));
    process.exit();
});