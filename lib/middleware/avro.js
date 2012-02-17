
/*!
 * Knot - JSON
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var avro = require('avro');

module.exports = function json(schemaIn, schemaOut){
    return function(req, res, next){
        var end;
        if(!avro.validate(schemaIn, req.data)){
            res.end({error:'Avro in: Schema not validated'});
            return;
        }
        schemaOut = schemaOut || schemaIn;
        end = res.end;
        // proxy res.end()
        res.end = function(data, encoding){
            res.end = end;
            if(!avro.validate(schemaOut, data)){
                res.end({error:'Avro out: Schema not validated'});
                return;
            }
            res.end(data, encoding);
        };
        next();
    }
};