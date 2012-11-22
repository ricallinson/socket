//    (The MIT License)
//
//    Copyright (c) 2012 Richard S Allinson <rsa@mountainmansoftware.com>
//
//    Permission is hereby granted, free of charge, to any person obtaining
//    a copy of this software and associated documentation files (the
//    'Software'), to deal in the Software without restriction, including
//    without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//    permit persons to whom the Software is furnished to do so, subject to
//    the following conditions:
//
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*jslint */

'use strict';

var socket = require('../'),
    now = require("microtime").now,
    app,
    res,
    start,
    entries = 1000000,
    result = {
        success: 0,
        failure: 0,
        other: 0
    };

/*
    Write "count" entries
*/

function writeSampleItems(app, count, kb) {
    var i,
        v = "";

    result = {
        success: 0,
        failure: 0,
        other: 0
    };

    for (i = 0; i < kb * 1024; i += 1) {
        v += "X";
    }

    for (i = 0; i <= count; i += 1) {
        app.handle({data: "wkey-" + i + ":" + i + " " + v}, res);
    }

    console.log(result);
}

/*
    Delete "count" entries
*/

function deleteSampleItems(app, count) {
    var i;
    for (i = 0; i <= count; i += 1) {
        app.handle({data: "dkey-" + i}, res);
    }
}

/*
    Log Memory Usage
*/

function logMemoryUsage() {
    var mem = process.memoryUsage();
    console.log("Memory used: " + Math.round(mem.heapUsed / 1.049e+6) + "mb");
}

/*
    Create our socket server
*/

app = socket.createServer(
    socket.hashMap()
);

/*
    Fake an end() function
*/

res = {
    end: function (data) {
        if (data === "0") {
            result.success += 1;
        } else if (data === "1") {
            result.failure += 1;
        } else {
            result.other += 1;
        }
        // console.log(data);
    }
};

/*
    Add items
*/

console.log("");
start = now();
writeSampleItems(app, entries, 1);
console.log("Time to add entries: " + ((now() - start) / 1000000) + "s");
logMemoryUsage();

/*
    Get an item
*/

start = now();
app.handle({data: "rkey-" + entries}, res);
console.log("Time to read an entry: " + ((now() - start) / 1000000) + "s");

/*
    Delete Items
*/

start = now();
deleteSampleItems(app, entries);
console.log("Time to delete entries: " + ((now() - start) / 1000000) + "s");

/*
    Memory after GC
*/

setTimeout(function () {
    logMemoryUsage();
}, 1000);
