class HashMap {
    #hashArray;
    #capacity;
    #maxFilling = 0.7; // Хеш-таблицы лучше всего работают, когда они заполнены не более чем на половину или максимум на две трети
    #nonItem;
    length = 0;

    constructor(capacity) {
        if (typeof capacity !== 'number' || capacity < 1) {
            throw new Error('Capacity should be a positive number.');
        }

        // Если размер массива не является простым числом, в ходе пробирования возможна бесконечная последовательность проверок
        if (!this.#isPrime(capacity)) {
            capacity = this.#getPrime(capacity);
        }

        this.#hashArray = new Array(capacity).fill(null);
        this.#capacity = capacity;
        this.#nonItem = new DataItem(-1, null);
    }

    set(key, val) {
        if (this.#checkFullness()) {
            this.#doubleHashArrSize();
        }

        let dataItem = new DataItem(key, val);
        let hashVal = this.#getHash(key, this.#hashFunc1.bind(this));
        let stepSize = this.#getHash(key, this.#hashFunc2.bind(this));

        while (this.#hashArray[hashVal] !== null && this.#hashArray[hashVal].getKey() !== -1) {
            hashVal += stepSize;
            hashVal %= this.#capacity;
        }

        this.#hashArray[hashVal] = dataItem;
        this.length++;
    }

    get(key) {
        let hashVal = this.#getHash(key, this.#hashFunc1.bind(this));
        let stepSize = this.#getHash(key, this.#hashFunc2.bind(this));

        while (this.#hashArray[hashVal] !== null) {
            let isEqual = this.#compareKeys(this.#hashArray[hashVal].getKey(), key);

            if (isEqual) {
                return this.#hashArray[hashVal].value;
            }

            hashVal += stepSize;
            hashVal %= this.#capacity;
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    delete(key) {
        let hashVal = this.#getHash(key, this.#hashFunc1.bind(this));
        let stepSize = this.#getHash(key, this.#hashFunc2.bind(this));

        while (this.#hashArray[hashVal] !== null) {
            let isEqual = this.#compareKeys(this.#hashArray[hashVal].getKey(), key);

            if (isEqual) {
                let tmp = this.#hashArray[hashVal];
                this.#hashArray[hashVal] = this.#nonItem;

                this.length--;
                debugger;
                return tmp.value;
            }

            hashVal += stepSize;
            hashVal %= this.#capacity;
        }

        return null;
    }

    #checkFullness() {
        return this.length / this.#capacity >= this.#maxFilling;
    }

    #doubleHashArrSize() {
        let newCapacity = this.#capacity <<= 1;

        if (!this.#isPrime(newCapacity)) {
            newCapacity = this.#getPrime(newCapacity);
        }

        let newHashArr = new Array(newCapacity).fill(null);

        for (let i = 0; i < this.#hashArray.length; i++) {
            if (this.#hashArray[i] !== null && this.#hashArray[i].getKey() !== -1) {
                let hashVal = this.#getHash(this.#hashArray[i].getKey(), this.#hashFunc1.bind(this));
                let stepSize = this.#getHash(this.#hashArray[i].getKey(), this.#hashFunc2.bind(this));

                while (newHashArr[hashVal] !== null && newHashArr[hashVal].getKey() !== -1) {
                    hashVal += stepSize;
                    hashVal %= newCapacity;
                }

                newHashArr[hashVal] = this.#hashArray[i];
            }
        }

        this.#capacity = newCapacity;
        this.#hashArray = newHashArr;
    }

    #getPrime(num) {
        for (let i = num + 1; ; i++) {
            if (this.#isPrime(i)) return i;
        }
    }

    #isPrime(num) {
        for (let i = 2; (i * i <= num); i++) {
            if (num % i === 0) return false;
        }

        return true;
    }

    #getHash(val, hashFunc) {
        let valType = typeof val;
        let numericVal = 0;

        switch (valType) {
            case 'number':
                numericVal = val;

                break;
            case 'string':
                numericVal = val.split('').reduce((acc, el) => acc += el.charCodeAt(0), 0);

                break;
            case 'object':
            case 'boolean':
                this.#getHash(this.#objToStr(val), this.#hashFunc1.bind(this));

                break;
            default:
                throw new TypeError(`Type of the key "${valType}" is not valid.`);

        }

        return hashFunc(numericVal);
    }

    #hashFunc1(val) {
        return val % this.#capacity;
    }

    #hashFunc2(val) {
        return 5 - val % 5;
    }

    #objToStr(obj) {
        return JSON.stringify(obj);
    }

    #compareKeys(hashArrItemKey, key) {
        if (typeof key === 'object') {
            return this.#objToStr(hashArrItemKey) === this.#objToStr(key);
        }

        return hashArrItemKey === key;
    }
}
