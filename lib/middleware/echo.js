/*
 * Echo
 */

module.exports = function echo(){
    return function(req, res){
        res.data = JSON.stringify(req, null, 2);
        res.end();
    };
};