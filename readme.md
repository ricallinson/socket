# Socket

Socket is an extensible TCP server framework for node,
shipping with 4 bundled middleware modules.

    var socket = require('socket');
    
    socket.createServer(
        socket.profiler(),
        socket.echo()
    ).listen(3357);

## Installation

    $ npm install socket

## Middleware

* *echo* simple echo server
* *json* application/json parser
* *profiler* per-request time and memory profiler
* *errorHandler* flexible error handler

## Inspiration

Socket is built on the ideas and code found in [https://github.com/senchalabs/connect/](connect).
