
/*!
 * Knot - Simpe Time Server Example
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('knot');

function simpleTimeServer (){
    console.log('Simple Time Server started\r\n');
    return function(req, res){
        var time = new Date().getTime();
        res.end(time.toString()+'\r\n');
    };
}

knot.createServer(
    {term:''},
    knot.profiler(),
    simpleTimeServer()
).listen(1024);