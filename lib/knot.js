
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
 * Expose createServer
 */

exports.dispatch = proto.dispatch;

/**
 * Create a new knot server.
 *
 * @return {Function}
 * @api public
 */

function createServer() {
    var i, opt;
    function app(req, res){
        app.handle(req, res);
    }
    utils.merge(app, proto);
    app.route = '/';
    app.stack = [];
    app.TERM = '\r\n';
    app.ENCODING = 'utf8';
    
    // I have no idea how Connect does this?
    for(i=0;i<arguments.length;i++){
        if(typeof arguments[i] === 'function'){
            app.use(arguments[i]);
        }else if(typeof arguments[i] === 'object' && !opt){
            opt = arguments[i];
        }
    }
    // If we were given options, use them.
    if(opt){
        app.TERM = opt.term !== undefined ? opt.term : '\r\n';
        app.ENCODING = opt.encoding || 'utf8';
    }

    return app;
}

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
