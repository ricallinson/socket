
/*!
 * Knot - errorHandler
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

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
        console.error(err.stack);
        var error = {
            message: err.message,
            stack: err.stack
        };
        for (var prop in err) error[prop] = err[prop];
        var json = JSON.stringify({error: error});
        res.end(json);
    };
};