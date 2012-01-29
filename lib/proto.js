var net = require('net');
var utils = require('./utils');

// prototype

var app = module.exports = {};

// environment

var env = process.env.NODE_ENV || 'development';

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
                res.end(utils.error(err));
            } else {
                res.end(utils.error('Not found'));
            }
            return;
        }

        try {

            if(layer.key !== '' && utils.keyExists(layer.key, req) === false){
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

app.listen = function(port, ip){
    var that = this;
    var server = net.createServer(function (socket) {
        var req = '', res = {};

        socket.setEncoding('utf8');
        socket.on('data', function(data){
            req+= data;
            if(data.slice(-2) === '\r\n'){
                try{
                    req = JSON.parse(data.slice(0,data.length-2));
                }catch(e){
                    socket.end(JSON.stringify(utils.error('Bad request'))+'\r\n');
                    return;
                }
                res.end = function(){
                    socket.end(JSON.stringify(res));
                };
                that.handle(req, res);
            }
        });
    });
    server.listen(port, ip);
};