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

* _echo_ simple echo server
* _json_ application/json parser
* _profiler_ per-request time and memory profiler
* _errorHandler_ flexible error handler

## Inspiration

Socket is built on the ideas and code found in [https://github.com/senchalabs/connect/](connect).
