const availableTypes = ['utf16', 'u16'];

function normalizeSchema(schema) {
    return schema.flatMap(([name, type, max]) => {
        if (type === 'utf16') {
            let res = new Array(max);

            for (let i = 0; i < res.length; i++) {
                res[i] = [16, {
                    name,
                    type,
                    max
                }];
            }

            return res;
        } else if (type === 'u16') {
            return [[16, { name, type, max: 65535 }]];
        }
    });
}

function getViewMaxSize(normalizedSchema) {
    return Math.max(...normalizedSchema.map(([size]) => size <= 8 ? 8 : size <= 16 ? 16 : 32));
}

function addOffsets(normalizedSchema) {
    const size = this.getViewMaxSize(normalizedSchema);
    let res = [];

    loop: for (let i = 0, index = 0; i < normalizedSchema.length; index++) {
        let offset = 0;

        while (offset + normalizedSchema[i][0] <= size) {
            const cur = normalizedSchema[i];

            res.push([cur[0], { ...cur[1], offset, index }]);
            offset += cur[0];
            i++

            if (i === normalizedSchema.length) {
                break loop;
            }
        }
    }

    return res;
}

function createMask(size, offset = 0) {
    return (2 ** 32 - 1 >>> 32 - size) << offset;
}

function validateSchema(schema) {
    debugger;
    if (!Array.isArray(schema) || !schema.length) {
        throw new Error('Required parameter "schema" is not an array or empty.');
    }

    schema.forEach(el => {
        if (!availableTypes.includes(el[1])) {
            throw new Error(`Type "${el[1]}" is not available. Available types: ${availableTypes.join(', ')}.`);
        }
    });
}

function validateData(data, max) {
    const type = typeof data;

    switch (type) {
        case 'string':
            if (data.length > max) {
                throw new Error(`Too long string. Max length is ${max}.`);
            }

            break;
        case 'number':
            if (data < 0 || data > max) {
                throw new Error(`The number should be between 0 and ${max}.`);
            }

            break;
        default:
            throw new Error(`Out of schema.`);
    }
}

function Structure(schema) {
    validateSchema(schema);

    const normalizedSchema = normalizeSchema(schema);
    const schemaWithOffsets = addOffsets(normalizedSchema);
    const viewMaxSize = getViewMaxSize(normalizedSchema);
    const typedArray = new globalThis[`Uint${viewMaxSize}Array`](schemaWithOffsets.at(-1)[1].index + 1);
    const resObj = {};

    for (let i = 0; i < schemaWithOffsets.length; i++) {
        const [size, { index, name, offset, type, max }] = schemaWithOffsets[i];

        Object.defineProperty(resObj, name, {
            enumerable: true,
            get() {
                let val = '';

                if (type === 'utf16') {
                    for (let i = 0; i < max; i++) {
                        if (!typedArray[index + i]) break;

                        val += String.fromCharCode(typedArray[index + i] & createMask(size, offset) >> offset);
                    }
                } else {
                    val = typedArray[index] & createMask(size, offset) >> offset;
                }

                return val;
            },
            set(val) {
                validateData(val, max);

                if (type === 'utf16') {
                    const valArr = val.split('');

                    for (let i = 0; i < max; i++) {
                        typedArray[index + i] &= 0;

                        if (valArr[i]) {
                            typedArray[index + i] |= (valArr[i].charCodeAt(0) & createMask(size)) << offset;
                        }
                    }
                } else {
                    typedArray[index] &= 0;
                    typedArray[index] |= (val & createMask(size)) << offset;
                }
            }
        })

        if (type === 'utf16') {
            i += max;
        }
    }

    resObj.get = function(name) {
        return resObj[name];
    }

    resObj.set = function(name, val) {
        resObj[name] = val;
    }

    return resObj;
}
