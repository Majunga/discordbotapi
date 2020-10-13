"use strict";
exports.__esModule = true;
exports.Check = void 0;
var Check = /** @class */ (function () {
    function Check() {
    }
    Check.checkIsDefined = function (value, message) {
        if (value === undefined || value === null) {
            throw new Error(message);
        }
        return value;
    };
    Check.isNullOrWhitespace = function (value) {
        return value === null || value === undefined || value.trim().length === 0;
    };
    return Check;
}());
exports.Check = Check;
