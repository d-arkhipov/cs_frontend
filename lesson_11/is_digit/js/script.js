'use strict';

function isDigit(str) {
    validate(str);

    let comparator;

    for (const char of str) {
        comparator ??= getComparator(char);

        if (comparator == null || comparator(char.codePointAt(0)) !== 0) {
            return false;
        }
    }

    return true;
}

function getComparator(char) {
    const alphabets = [
        ['arabic', code => code < 0x0030 ? -1 : code > 0x0039 ? 1 : 0],
        ['rome', code => code < 0x2160 ? -1 : code > 0x2188 ? 1 : 0],
        ['greek', code => code < 0x10140 ? -1 : code > 0x10174 ? 1 : 0]
    ];

    let from = 0,
        to = alphabets.length;

    const charCode = char.codePointAt(0);

    if (charCode == null) {
        return null;
    }

    while (from < to) {
        const mid = Math.floor((from + to) / 2),
              [_, comparator] = alphabets[mid];

        const comparingRes = comparator(charCode);

        if (comparingRes === 0) {
            return comparator;
        }

        if (comparingRes < 0) {
            to = mid;
        } else {
            from = mid + 1;
        }
    }

    return null;
}

function validate(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`The parameter should be a string. "${typeof str}" given.`);
    }

    if (!str.length) {
        throw new Error('The string is empty.');
    }
}
