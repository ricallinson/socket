
/*!
 * Knot - Echo
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

module.exports = function echo(){
    return function(req, res){
        res.end(req.data);
    };
};