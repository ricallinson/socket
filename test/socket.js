/*global describe, it*/

"use strict";

var assert = require("assert"),
    socket = require("../"),
    fs = require("fs"),
    path = require("path");

describe("socket version", function () {
    it("should return true if versions are the same", function () {
        var json = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8");
        json = JSON.parse(json);
        assert.equal(socket.version, json.version);
    });
});
describe("socket", function () {
    it("should return a function", function () {
        assert.equal(typeof socket, "function");
    });
});
describe("socket.createServer()", function () {
    it("should return a function", function () {
        assert.equal(typeof socket.createServer, "function");
    });
    it("should return a function", function () {
        assert.equal(typeof socket.createServer().use, "function");
    });
    it("should return a function", function () {
        assert.equal(typeof socket.createServer().handle, "function");
    });
    it("should return a function", function () {
        assert.equal(typeof socket.createServer().listen, "function");
    });
    it("should return a function", function () {
        assert.equal(typeof socket.createServer().dispatch, "function");
    });
    it("should return an array of 0 items", function () {
        var server = socket.createServer();
        assert.equal(server.stack.length, 0);
    });
    it("should return the value of TERM as diff", function () {
        var server = socket.createServer({term: "diff"});
        assert.equal(server.TERM, "diff");
    });
    it("should return the value of ENCODING as diff", function () {
        var server = socket.createServer({encoding: "diff"});
        assert.equal(server.ENCODING, "diff");
    });
    it("should return a function after use", function () {
        var server = socket.createServer(function () {});
        assert.equal(typeof server.stack[0].handle, "function");
        assert.equal(server.stack.length, 1);
    });
    it("should return a function after key and use", function () {
        var server = socket.createServer();
        server.use("test", function () {});
        assert.equal(server.stack[0].key, "test");
        assert.equal(typeof server.stack[0].handle, "function");
        assert.equal(server.stack.length, 1);
    });
});
describe("socket.dispatch()", function () {
    it("should return a function", function () {
        assert.equal(typeof socket.dispatch, "function");
    });
});
describe("socket.middleware", function () {
    it("should have echo", function () {
        assert.equal(typeof socket.echo, "function");
    });
    it("should have errorHandler", function () {
        assert.equal(typeof socket.errorHandler, "function");
    });
    it("should have json", function () {
        assert.equal(typeof socket.json, "function");
    });
    it("should have logger", function () {
        assert.equal(typeof socket.logger, "function");
    });
    it("should have profiler", function () {
        assert.equal(typeof socket.profiler, "function");
    });
});