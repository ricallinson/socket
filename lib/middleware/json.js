
/*!
 * Knot - JSON
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

module.exports = function json(){
    return function(req, res, next){
        var end = res.end;
        try{
            req.data = JSON.parse(req.data);
        }catch(e){
            res.end('{error:"bad json request"}');
        }
        // proxy res.end()
        res.end = function(data, encoding){
            data = JSON.stringify(data);
            res.end = end;
            res.end(data, encoding);
        };
        next();
    }
};