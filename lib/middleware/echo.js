/*
 * Echo
 */

module.exports = function echo(){
    return function(req, res){
        res.data = req;
        res.end();
    };
};