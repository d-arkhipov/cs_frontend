'use strict';

function bisecLeft(array, comparator) {
    validate(array, comparator);

    let lowerBound = 0;
    let upperBound = array.length - 1;
    let result = -1;

    while (lowerBound < upperBound) {
        let index = Math.floor((lowerBound + upperBound) / 2);
        let compareRes = comparator(array[index]);

        if (compareRes < 0) {
            lowerBound = index + 1;
        } else if (compareRes === 0) {
            result = index;

            for (let i = index - 1; i >= 0; i--) {
                if (array[i] !== array[index]) break;

                result = i;
            }

            return result;
        } else {
            upperBound = index - 1;
        }
    }

    return -1;
}

function bisecRight(array, comparator) {
    validate(array, comparator);

    let lowerBound = 0;
    let upperBound = array.length - 1;
    let result = -1;

    while (lowerBound < upperBound) {
        let index = Math.floor((lowerBound + upperBound) / 2) + 1;
        let compareRes = comparator(array[index]);

        if (compareRes < 0) {
            lowerBound = index + 1;
        } else if (compareRes === 0) {
            result = index;

            for (let i = index + 1; i < array.length; i++) {
                if (array[i] !== array[index]) break;

                result = i;
            }

            return result;
        } else {
            upperBound = index - 1;
        }
    }

    return result;
}

function validate(arr, func) {
    if (!Array.isArray(arr)) {
        throw new TypeError('The first parameter should be an array.')
    }

    if (!arr.length) {
        throw new Error('The array is empty.');
    }

    if (typeof func !== 'function') {
        throw new TypeError(`The second parameter should be a function. "${typeof func}" given.`);
    }
}
