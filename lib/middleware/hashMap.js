//    (The MIT License)
//
//    Copyright (c) 2012 Richard S Allinson <rsa@mountainmansoftware.com>
//
//    Permission is hereby granted, free of charge, to any person obtaining
//    a copy of this software and associated documentation files (the
//    "Software"), to deal in the Software without restriction, including
//    without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//    permit persons to whom the Software is furnished to do so, subject to
//    the following conditions:
//
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*jslint */

"use strict";

/*
    HashMap

    opt = {
        maxKeySize: 64,
        maxKeyValue: 10, // 10kb
        maxKeys: 1000000,
        maxHeap: 1000 // 1gb
    };
*/

module.exports = function hashMap(opt) {

    var map = {},
        index,
        curKeys = 0,
        maxKeySize,
        maxKeyValue,
        maxKeys,
        maxHeap,
        SUCCESS = "0",
        FAILURE = "1";

    /*
        Create the options object if we don't have one
    */

    opt = opt || {};

    /*
        Set the maximum key size in bytes that will be accepted
    */

    maxKeySize = opt.maxKeySize || 64;

    /*
        Set the maximum value size in kilobytes that will be accepted
    */

    maxKeyValue = (opt.maxKeyValue || 10) * 1024; // kb

    /*
        Set the maximum number of keys allowed
    */

    maxKeys = opt.maxKeys || 1000000;

    /*
        Set the maximum memory heap allowed in megabytes
    */

    maxHeap = (opt.maxHeap || 1000) * 1.049e+6; // mb

    /*
        Return the middleware handler function.
    */

    return function (req, res, next) {

        var cmd,
            key,
            val,
            index;

        cmd = req.data[0];
        index = req.data.indexOf(":");

        if (index > 0) {
            key = key = req.data.slice(1, index);
            val = req.data.slice(index + 1);
        } else {
            key = req.data.substring(1);
        }

        if (key.length > maxKeySize) {
            res.end(FAILURE);
            return;
        }

        /*  
            Check the first char of req.data to see what action to perform.
        */

        if (cmd === "r") {

            /*  
                Read a key.
                
                req.data = r<key>

                e.g. "r123"
            */

            if (!map[key]) {
                res.end(FAILURE);
                return;
            }

            res.end(map[key]);

        } else if (cmd === "w") {

            /*  
                Write a key.

                req.data = w<key>:<data>

                e.g. "w123:Data value"
            */

            if (curKeys >= maxKeys || process.memoryUsage().heapUsed >= maxHeap || !val || val.length > maxKeyValue) {
                res.end(FAILURE);
                return;
            }

            map[key] = val;
            curKeys = curKeys + 1;
            res.end(SUCCESS);

        } else if (cmd === "d") {

            /*  
                Delete a key.
                
                req.data = d<key>

                e.g. "d123"
            */

            if (!map[key]) {
                res.end(FAILURE);
                return;
            }

            delete map[key];
            curKeys = curKeys - 1;
            res.end(SUCCESS);

        } else {

            /*  
                If there is no match do nothing
            */

            next();
        }
    };
};