'use strict';

function* iterate(str) {
    validate(str);

    for (let i = 0; i < str.length; i++) {
        const char = str[i],
              charCode = char.charCodeAt(0);

        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            const nextChar = str[i +1],
                  nextCharCode = nextChar.charCodeAt(0);

            if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
                yield char + nextChar;
                i++;
                continue;
            }
        }

        yield char;
    }
}

function validate(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`The parameter should be a string. "${typeof str}" given.`);
    }

    if (!str.length) {
        throw new Error('The string is empty.');
    }
}
