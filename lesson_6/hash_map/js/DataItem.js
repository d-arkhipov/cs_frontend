class DataItem {
    #key;
    value;

    constructor(key, value) {
        this.#validate(key, value);

        this.#key = key;
        this.value = value;
    }

    getKey() {
        return this.#key;
    }

    #validate(key, value) {
        if (key === undefined) {
            throw new Error('The key is undefined.');
        }

        if (value === undefined) {
            throw new Error('The value is undefined.');
        }
    }
}
