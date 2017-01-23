"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function snakeToCamelCase(obj) {
    if (typeof obj === "string") {
        return snakeToCamel(obj);
    }

    return traverse(obj, snakeToCamel);
}

function camelToSnakeCase(obj) {
    if (typeof obj === "string") {
        return camelToSnake(obj);
    }

    return traverse(obj, camelToSnake);
}

module.exports = {
    snakeToCamelCase: snakeToCamelCase,
    camelToSnakeCase: camelToSnakeCase
};

function traverse(obj, transform) {
    if (!obj) {
        return obj;
    }

    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
        return obj; // must be an object
    }

    if (isArray(obj)) {
        return obj.map(function (el) {
            return traverse(el, transform);
        });
    }

    if (!isSimpleObject(obj)) {
        return obj; // avoiding String and other custom objects
    }

    return Object.keys(obj).reduce(function (acc, key) {
        var convertedKey = transform(key);
        acc[convertedKey] = traverse(obj[key], transform);
        return acc;
    }, {});
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

function isSimpleObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

function snakeToCamel(str) {
    return str.replace(/[_.-](\w|$)/g, function (match, value) {
        return value.toUpperCase();
    });
}

function camelToSnake(str) {
    return str.replace(/[A-Z]/g, function (upperCaseLetter) {
        return "_" + upperCaseLetter.toLowerCase();
    });
}