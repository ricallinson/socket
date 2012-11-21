/*jslint */
/*global describe, it*/

"use strict";

var assert = require("assert"),
    proto = require("../lib/proto");

describe("proto.use()", function () {
    it("should return a function", function () {
        assert.equal(typeof proto.use, "function");
    });
});
describe("proto.handle()", function () {
    it("should return a function", function () {
        assert.equal(typeof proto.handle, "function");
    });
});
describe("proto.listen()", function () {
    it("should return a function", function () {
        assert.equal(typeof proto.listen, "function");
    });
});
describe("proto.dispatch()", function () {
    it("should return a function", function () {
        assert.equal(typeof proto.dispatch, "function");
    });
});