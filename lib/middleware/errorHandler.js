/*!
 * Connect - errorHandler
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('../utils');

// environment

var env = process.env.NODE_ENV || 'development';

/**
 * Development error handler, providing stack traces
 * and error message responses for requests accepting text, html,
 * or json.
 *
 * Will respond with an object in the form of `{ "error": error }`.
 *
 * @return {Function}
 * @api public
 */

exports = module.exports = function errorHandler(){
    return function errorHandler(err, req, res, next){
        if (err.status) res.statusCode = err.status;
        if (res.statusCode < 400) res.statusCode = 500;
        if ('test' != env) console.error(err.stack);

        var error = {
            message: err.message,
            stack: err.stack
        };
        
        for (var prop in err) error[prop] = err[prop];
        var json = JSON.stringify({
            error: error
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(json);
    };
};
