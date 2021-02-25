"use strict";
exports.__esModule = true;
var Util = require("util");
var chalk = require("chalk");
var sparkles = require("sparkles");
var _ = require("lodash");
/**
 * Format the messagse
 * @param  {*} message - The message to format.
 * @return {*}         - The formatted message.
 */
function format() {
    return _.isString(arguments[0])
        ? Util.format.apply(null, arguments)
        : arguments[0];
}
/**
 * Create an emitter
 * @ignore
 * @return function - The emitter function that emits the message.
 */
var emitter = function (level) {
    return function emit() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.emit(level, format.apply(null, args));
    };
};
/** @class Log - A class that represents a logger. */
var Log = /** @class */ (function () {
    /**
     * The namespace of the logger's instance
     * @param namespace: string = 'cshark'
     */
    function Log(namespace) {
        var _this = this;
        if (namespace === void 0) { namespace = "cshark"; }
        this.event = sparkles(namespace);
        Log.levels.forEach(function (level) {
            _this.event[level] = emitter(level);
        });
    }
    /**
     * Call the debug logger.
     */
    Log.prototype.debug = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.event).debug.apply(_a, args);
    };
    /**
     * Call the debug logger.
     */
    Log.prototype.info = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.event).info.apply(_a, args);
    };
    /**
     * Call the debug logger.
     */
    Log.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.event).warn.apply(_a, args);
    };
    /**
     * Call the debug logger.
     */
    Log.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.event).error.apply(_a, args);
    };
    /**
     * Catch the event based on log level.
     */
    Log.prototype.on = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.event).on.apply(_a, args);
    };
    /**
     * Unsubscribe to the current namespace.
     */
    Log.prototype.off = function () {
        this.event.remove();
    };
    Object.defineProperty(Log, "levels", {
        /**
         * Get the available levels.
         * @static
         * @return {Array<string>} - The available levels in Log.
         */
        get: function () {
            return ["debug", "info", "warn", "error"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Log, "color", {
        /**
         * Get an instance of Chalk.
         * @return {Chalk} - An instance of Chalk.
         */
        get: function () {
            return chalk;
        },
        enumerable: false,
        configurable: true
    });
    return Log;
}());
exports["default"] = Log;
