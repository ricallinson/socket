
/*!
 * Knot - Nxxx Time Protocol
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

module.exports = function ntp(){
    console.log('Nxxx Time Protocol in use.');
    return function(req, res){
        var time = new Date().getTime();
        res.end(time.toString()+'\r\n');
    };
};