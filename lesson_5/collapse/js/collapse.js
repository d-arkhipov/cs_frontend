function validate(obj) {
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
        throw new Error(`The parameter should be an object. "${Object.prototype.toString.call(obj).match(/\s([^\]]+)/)[1]}" given.`);
    }
}

function collapseByRecursion(obj) {
    validate(obj);

    let res = {};

    function toFlatObj(propName, propValue) {
        if (typeof propValue !== 'object') {
            res[propName] = propValue;
            return;
        }

        for (let [key, val] of Object.entries(propValue)) {
            toFlatObj(propName ? `${propName}.${key}` : key, val);
        }
    }

    toFlatObj('', obj);

    return res;
}

function collapseByStack(obj) {
    validate(obj);

    let stack = new Stack(Array, 10);
    let res = {};

    stack.push(['', obj]);

    while (!stack.isEmpty()) {
        let [propName, propValue] = stack.pop();

        if (typeof propValue !== 'object') {
            res[propName] = propValue;
            continue;
        }

        for (let [key, val] of Object.entries(propValue).reverse()) {
            stack.push([propName ? `${propName}.${key}` : key, val]);
        }
    }

    return res;
}
