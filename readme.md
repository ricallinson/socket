# Socket

[![Build Status](https://secure.travis-ci.org/ricallinson/socket.png?branch=master)](http://travis-ci.org/ricallinson/socket)

Socket is an extensible TCP server framework for node, shipping with several bundled middleware modules.

    var socket = require('socket');
    socket.createServer(
        socket.profiler(),
        socket.echo()
    ).listen(3357);

## Installation

    $ npm install socket

## Middleware

* __echo__ simple echo server
* __json__ application/json parser
* __profiler__ per-request time and memory profiler
* __errorHandler__ flexible error handler

## Inspiration

Socket is built on the ideas and code found in [https://github.com/senchalabs/connect/](connect).
