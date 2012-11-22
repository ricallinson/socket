/*jslint */
/*global describe, it*/

"use strict";

var assert = require("assert"),
    socket = require("../");

describe("proto.handle()", function () {

    var res = {
            end: function (data) {}
        };

    it("should return true when the middleware is run", function () {

        var app = socket.createServer(),
            result = false;

        app.use(function(req, res, next) {
            result = true;
        });

        app.handle({}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, true);
    });

    it("should return false when the middleware is not matched to the string", function () {

        var app = socket.createServer(),
            result = false;

        app.use("test", function(req, res, next) {
            result = true;
        });

        app.handle({data: ""}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, false);
    });

    it("should return true when the middleware is matched to the string", function () {

        var app = socket.createServer(),
            result = false;

        app.use("test", function(req, res, next) {
            result = true;
        });

        app.handle({data: "test"}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, true);
    });

    it("should return true when the middleware is matched to the start of the string", function () {

        var app = socket.createServer(),
            result = false;

        app.use("test", function(req, res, next) {
            result = true;
        });

        app.handle({data: "testme"}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, true);
    });

    it("should return false when the middleware is matched to the object path", function () {

        var app = socket.createServer(),
            result = false;

        app.use("foo.bar", function(req, res, next) {
            result = true;
        });

        app.handle({data: {foo: {baz: "bar"}}}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, false);
    });

    it("should return true when the middleware is matched to the object path", function () {

        var app = socket.createServer(),
            result = false;

        app.use("foo.bar", function(req, res, next) {
            result = true;
        });

        app.handle({data: {foo: {bar: "baz"}}}, res);

        assert.equal(app.stack.length, 1);
        assert.equal(result, true);
    });

    it("should return true when both the middlewares is matched to the string", function () {

        var app = socket.createServer(),
            result = 0;

        app.use("test", function(req, res, next) {
            result += 1;
            next();
        });

        app.use("test", function(req, res, next) {
            result += 1;
        });

        app.handle({data: "test"}, res);

        assert.equal(app.stack.length, 2);
        assert.equal(result, 2);
    });
});