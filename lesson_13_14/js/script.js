'use strict';

const wordDollar = /^[\w$]+$/;
// wordDollar.test('привет'); // false

const separator = /,\d,\d{2};/;
// '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(separator, 5); // ['762120', '763827', '750842', '749909', '755884']

const objSplitter = /("[a-z]"): ("?\d"?)/g;
// [...'{"a": 1, "b": "2"}'.matchAll(objSplitter)]; // [['"a": 1', '"a"', '1'], ['"b": "2"', "b", '"2"']]

// const res = format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 }); // Hello, Bob! Your age is 10.
function format(str, params) {
    validate(str, params);

    return str.replace(/\${([a-z]+)}/g, (match, group) => {
        if (group in params) {
            return params[group];
        }

        return match;
    });

    function validate(str, obj) {
        if (typeof str !== 'string') {
            throw new TypeError(`The first parameter should be a string, "${typeof str}" given.`);
        }

        if (Object.prototype.toString.call(obj) !== '[object Object]') {
            throw new TypeError(
                `The second parameter should be an object,
                 "${Object.prototype.toString.call(obj).match(/\s([^\]]+)/)[1].toLowerCase()}" given.`
            );
        }
    }
}

// calc(`
// Какой-то текст (10 + 15 - 24) ** 2
// Еще какой-то текст 2 * 10
// `) == `
// Какой-то текст 1
// Еще какой-то текст 20
// `
function calc(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`The parameter should be a string, "${typeof str}" given.`);
    }

    return str.replace(/[(\d][\d( )+\-*\/%]+[\d)]/gm, (match) => eval(match));
}



