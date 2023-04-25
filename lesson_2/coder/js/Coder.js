class Coder {
    availableTypes = ['number', 'boolean', 'ascii'];
    bitsPerByte = 8; // Uint8Array

    encodeValidate(data, schema) {
        [
            { name: 'data', data: data },
            { name: 'schema', data: schema }
        ].forEach(param => {
            if (!Array.isArray(param.data) || !param.data.length) {
                throw new Error(`Required parameter "${param.name}" is not an array or empty.`);
            }
        });

        if (data.length !== schema.length) {
            throw new Error(`Data length ${data.length} is not equal to the schema length ${schema.length}.`);
        }

        schema.forEach((el, i) => {
            if (!~this.availableTypes.indexOf(el[1])) {
                throw new Error(`Type "${el[1]}" is not available. Available types: ${this.availableTypes.join(', ')}.`);
            }

            if (typeof data[i] === 'number' && data[i].toString(2).length > el[0]) {
                throw new Error(`The length of number "${data[i]}" (binary "${data[i].toString(2)}"), is bigger than in schema "${el[0]}".`);
            }

            if (typeof data[i] !== el[1]) {
                if (typeof data[i] === 'string') {
                    data[i].split('').forEach(char => {
                        if (char.charCodeAt(0) < 32 || char.charCodeAt(0) > 126) {
                            throw new Error(`"${char}" is not print ASCII symbol.`);
                        }
                    });
                } else {
                    throw new Error(`Type of ${i + 1} element "${typeof data[i]}", does not match the schema "${el[1]}".`);
                }
            }
        });
    }

    decodeValidate(data, schema) {
        if (!(data instanceof ArrayBuffer)) {
            throw new Error('The first parameter should be an instance of ArrayBuffer.');
        }

        if (!Array.isArray(schema) || !schema.length) {
            throw new Error(`Required parameter "schema" is not array or empty.`);
        }
    }

    encode(data, schema) {
        this.encodeValidate(data, schema);

        const bitsNum = schema.reduce((acc, el) => acc += el[0], 0);
        const bytesNum = Math.ceil(bitsNum / 8);
        let arrBuffer = new ArrayBuffer(bytesNum);
        let uInt8Arr = new Uint8Array(arrBuffer);
        let binaryStr = '';

        schema.forEach((el, i) => {
            switch (el[1]) {
                case 'number':
                    binaryStr += data[i].toString(2).padStart(el[0], '0');
                    break;
                case 'boolean':
                    binaryStr += +data[i];
                    break;
                case 'ascii':
                    binaryStr += data[i]
                        .split('')
                        .map(char => char.charCodeAt(0).toString(2).padStart(el[0] / data[i].length, '0'))
                        .join('');
            }
        });

        let binaryArr = binaryStr.split('');
        let counter = 0;

        for (let i = 0; i < bytesNum; i++) {
            for (let j = this.bitsPerByte - 1; j >= 0 ; j--) {
                if (+binaryArr[counter]) {
                    uInt8Arr[i] = (1 << j) | uInt8Arr[i];
                }

                counter++;
            }
        }

        return arrBuffer;
    }

    decode(dataArrBuffer, schema) {
        this.decodeValidate(dataArrBuffer, schema);

        let decodedArr = [];
        let uInt8Arr = new Uint8Array(dataArrBuffer);
        let dataStr = '';

        for (let i = 0; i < uInt8Arr.length; i++) {
            dataStr += uInt8Arr[i].toString(2).padStart(this.bitsPerByte, '0');
        }

        let offset = 0;

        schema.forEach(el => {
            switch (el[1]) {
                case 'number':
                    decodedArr.push(parseInt(dataStr.slice(offset, offset + el[0]), 2));
                    break;
                case 'boolean':
                    decodedArr.push(!!parseInt(dataStr.slice(offset, offset + el[0]), 2));
                    break;
                case 'ascii':
                    const charCnt = el[0] / this.bitsPerByte;
                    let charStr = '';

                    for (let i = 0; i < charCnt; i++) {
                        charStr += String.fromCharCode(parseInt(dataStr.slice(offset, offset + this.bitsPerByte), 2));
                        offset += this.bitsPerByte;
                    }

                    decodedArr.push(charStr);
            }

            offset += el[0];
        });

        return decodedArr;
    }
}
