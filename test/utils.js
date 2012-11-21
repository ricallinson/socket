/*jslint */
/*global describe, it*/

"use strict";

var assert = require("assert"),
    utils = require("../lib/utils");

describe("utils.merge(a, b)", function () {
    it("should generate mix of the two input objects", function () {
        var obj = utils.merge({a: "b"}, {a: "c", b: "d"});
        assert.equal(obj.a, "c");
        assert.equal(obj.b, "d");
    });
});

describe("utils.keyExists(key, obj)", function () {
    var obj = {a: {b: {c: "a"}}};
    it("should return true if the the key is found", function () {
        assert.equal(utils.keyExists("a", obj), true);
        assert.equal(utils.keyExists("a.b", obj), true);
        assert.equal(utils.keyExists("a.b.c", obj), true);
    });
    it("should return false if the the key is not found", function () {
        assert.equal(utils.keyExists("d", obj), false);
        assert.equal(utils.keyExists("a.c", obj), false);
        assert.equal(utils.keyExists("a.b.d", obj), false);
    });
})