class Vector {
    #typedArrayConstructor
    #typedArray;
    #capacity;
    length;

    constructor(typedArray, { capacity }) {
        if (typeof typedArray !== 'function') {
            throw new Error('The first parameter should be a constructor.');
        }

        if (typeof capacity !== 'number' || capacity < 0) {
            throw new Error('Capacity should be a positive number.');
        }

        this.#typedArrayConstructor = typedArray;
        this.#capacity = capacity;
        this.#typedArray = new typedArray(capacity);
        this.length = 0;
    }

    push(...val) {
        if (this.length === this.#capacity) {
            this.#increaseArray();
        }

        val.forEach(el => {
            if (typeof el !== 'number') {
                throw new Error(`You can only add a number. "${typeof el}" given.`);
            }

            this.#typedArray[this.length++] = el;
        });

        return this.length;
    }

    pop() {
        if (!this.length) {
            throw new Error('Can\'t pop. The vector is empty.');
        }

        let last = this.#typedArray[this.length - 1];
        this.#typedArray[this.length - 1] &= 0;
        this.length--;

        return last;
    }

    shift() {
        if (!this.length) {
            throw new Error('Can\'t shift. The vector is empty.');
        }

        let first = this.#typedArray[0];

        for (let i = 0; i < this.length; i++) {
            this.#typedArray[i] = this.#typedArray[i + 1];
        }

        this.length--;

        return first;
    }

    unshift(...val) {
        if (this.length + val.length > this.#capacity) {
            this.#increaseArray(this.length + val.length);
        }

        for (let i = this.length - 1; i >= 0; i--) {
            this.#typedArray[i + val.length] = this.#typedArray[i];
        }

        val.forEach((el, i) => {
            if (typeof el !== 'number') {
                throw new Error(`You can only add a number. "${typeof el}" given.`);
            }

            this.#typedArray[i] = el;
            this.length++
        });

        return this.length;
    }

    #increaseArray(maxSize) {
        while (this.#capacity < maxSize) {
            this.#capacity <<= 1;
        }

        let newTypedArray = new this.#typedArrayConstructor(this.#capacity);

        for (let i = 0; i < this.length; i++) {
            newTypedArray[i] = this.#typedArray[i];
        }

        this.#typedArray = newTypedArray;
    }
}
