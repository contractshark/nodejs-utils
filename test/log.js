"use strict";
exports.__esModule = true;
/* eslint-env node, mocha */
var chai_1 = require("chai");
var log_1 = require("../src/log");
describe("log", function () {
    var log;
    beforeEach(function (done) {
        log = new log_1["default"]();
        done();
    });
    afterEach(function (done) {
        log.off();
        done();
    });
    describe("debug()", function () {
        it("should emit a debug event when debug method is called", function (done) {
            log.on("debug", function (message) {
                chai_1.assert.strictEqual(message, "test");
                done();
            });
            log.debug("test");
        });
    });
    describe("info()", function () {
        it("should emit a info event when info method is called", function (done) {
            log.on("info", function (message) {
                chai_1.assert.strictEqual(message, "test");
                done();
            });
            log.info("test");
        });
    });
    describe("warn()", function () {
        it("should emit a warn event when warn method is called", function (done) {
            log.on("warn", function (message) {
                chai_1.assert.strictEqual(message, "test");
                done();
            });
            log.warn("test");
        });
    });
    describe("error()", function () {
        it("should emit a error event when error method is called", function (done) {
            log.on("error", function (message) {
                chai_1.assert.strictEqual(message, "test");
                done();
            });
            log.error("test");
        });
    });
    describe("formating strings", function () {
        it("should format a string message with util.format syntax", function (done) {
            log.on("debug", function (message) {
                chai_1.assert.strictEqual(message, "test something");
                done();
            });
            log.debug("test %s", "something");
        });
        it("should not format a non-string message", function (done) {
            var expected = { test: "something" };
            log.on("debug", function (message) {
                chai_1.assert.deepEqual(message, expected);
                done();
            });
            log.debug(expected);
        });
    });
});
