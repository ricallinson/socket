
/*!
 * Knot
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var net = require('net');
var utils = require('./utils');

// prototype

var app = module.exports = {};

// environment

var env = process.env.NODE_ENV || 'development';

/**
 * use
 */

app.use = function(key, fn){

    if ('string' != typeof key) {
        fn = key;
        key = '';
    }

    // wrap sub-apps
    if ('function' == typeof fn.handle) {
        var server = fn;
        fn.key = key;
        fn = function(req, res, next){
            server.handle(req, res, next);
        };
    }

    this.stack.push({
        key: key,
        handle: fn
    });

    return this;
};

/**
 * handle
 */

app.handle = function(req, res, out) {
    var stack = this.stack, index = 0;

    function next(err) {
        var layer;

        // next callback
        layer = stack[index++];

        // all done
        if (!layer) {
            // delegate to parent
            if (out) {
                out(err);
                return;
            }

            // unhandled error
            if (err) {
                res.end(err.toString());
            } else {
                res.end();
            }
            return;
        }

        try {
            // If we have a key and the req is JSON can we match to some middleware?
            // 'some.key.path' === use middleware
            if(layer.key !== '' && typeof req === 'object' && utils.keyExists(layer.key, req) === false){
                next(err);
                return;
            }

            var arity = layer.handle.length;
            if (err) {
                if (arity === 4) {
                    layer.handle(err, req, res, next);
                } else {
                    next(err);
                }
            } else if (arity < 4) {
                layer.handle(req, res, next);
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    }
    next();
};

/**
 * listen
 */

app.listen = function(port, ip){
    var that = this;
    var server = net.createServer(function (socket) {
        var req = {data:''},
            res = {data:''};

        var handle = function (data){
            if(typeof data === 'undefined'){
                data = '';
            }
            req.data+= data;
            if(data.slice(-that.TERM.length) === that.TERM){
                try{
                    req.data = req.data.slice(0,req.data.length-that.TERM.length);
                }catch(e){
                    socket.end('bad request'+that.TERM, that.ENCODING);
                    return;
                }
                that.handle(req, res);
            }
        }

        res.end = function (data, encoding){
            socket.end(data, encoding || that.ENCODING);
        };
        
        socket.setEncoding('utf8');
        socket.on('data', handle);

        if(!that.TERM){
            socket.on('connect', handle);
        }

    });
    server.listen(port, ip);
    return this;
};

/**
 * dispatch
 */

app.dispatch = function dispatch(port, ip, req, callback){
    var that = this;
    var buffer = '';
    var client = net.connect(port, ip, function() {
        client.write(req+that.TERM);
    });
    client.on('data', function(data) {
        buffer+= data;
    });
    client.on('end', function() {
        if(buffer.slice(-that.TERM.length) === that.TERM){
            buffer = buffer.slice(0,data.length-that.TERM.length);
        }
        callback(buffer);
    });
    return this;
};