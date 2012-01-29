
/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *     
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api private
 */

exports.merge = function(a, b){
    if (a && b) {
        for (var key in b) {
            a[key] = b[key];
        }
    }
    return a;
};

exports.keyExists = function(key, obj){

    if('string' === typeof key){
        key = key.split('.');
    }

    if(key.length === 0){
        return true;
    }

    if(obj[key[0]]){
        return this.keyExists(key.slice(1), obj);
    }
    
    return false;
};

/**
 * Creates Error object from string
 */
exports.error = function(msg){
    return {
        error: msg
    };
};