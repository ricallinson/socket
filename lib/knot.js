
/*!
 * Knot
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var proto = require('./proto'),
    utils = require('./utils'),
    net = require('net'),
    path = require('path'),
    basename = path.basename,
    fs = require('fs');

// expose createServer() as the module

exports = module.exports = createServer;

/**
 * Framework version.
 */

exports.version = '0.1.0';

/**
 * Expose createServer
 */

exports.createServer = createServer;

/**
 * Create a new knot server.
 *
 * @return {Function}
 * @api public
 */

function createServer() {
    function app(req, res){
        app.handle(req, res);
    }
    utils.merge(app, proto);
    app.route = '/';
    app.stack = [];

    // I have no idea how Connect does this?
    for(var i=0;i<arguments.length;i++){
        app.use(arguments[i]);
    }

    return app;
}

/**
 * Expose dispatch
 */

exports.dispatch = function dispatch(port, ip, obj, callback){
    var buffer = '';
    var client = net.connect(port, ip, function() {
        client.write(JSON.stringify(obj)+'\r\n');
    });
    client.on('data', function(data) {
        buffer+= data;
    });
    client.on('end', function() {
        callback(JSON.parse(buffer));
    });
};

/**
 * Auto-load bundled middleware with getters.
 */

fs.readdirSync(__dirname + '/middleware').forEach(function(filename){
    if (!/\.js$/.test(filename)) return;
    var name = basename(filename, '.js');
    function load(){
        return require('./middleware/' + name);
    }
    exports.__defineGetter__(name, load);
});
