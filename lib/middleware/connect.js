/* 
 * Connect to Knot
 */

var knot = require('../knot');
var utils = require('../utils');

module.exports = function connect(port, ip){
    return function(req, res){

        var obj = {
            meta: {
                http: {
                    httpVersion: req.httpVersion,
                    method: req.method,
                    url: req.url,
                    originalUrl: req.originalUrl,
                    statusCode: req.statusCode,
                    headers: req.headers,
                    query: req.query,
                    body: req.body
                }
            }
        };
        
        knot.dispatch(port, ip, obj, function(ret){
            // Default Header
            res.setHeader("Content-Type", "text/plain");
            // Add all http headers given in the returned obj
            if(ret.meta && ret.meta.http && ret.meta.http.headers){
                res.writeHead(ret.meta.http.statusCode , ret.meta.http.headers);
            }
            // End by sending the value of data given in the returned obj
            res.end(ret.data);
        });
    };
};