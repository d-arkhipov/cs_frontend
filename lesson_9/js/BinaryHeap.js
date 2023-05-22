class BinaryHeap {
    #comparator;
    #buffer;
    #lastIndex;

    constructor(comparator, buffer = []) {
        this.#validate(comparator);

        this.#comparator = comparator;
        this.#buffer = buffer;
        this.#lastIndex = buffer.length - 1;
    }

    get head() {
        return this.#buffer[0];
    }

    get length() {
        return this.#lastIndex + 1;
    }

    push(...values) {
        for (const value of values) {
            this.#lastIndex++;
            this.#buffer[this.#lastIndex] = value;
            this.fromBottom();
        }

        return this.length;
    }

    pop() {
        if (this.length === 0) {
            throw new Error('The heap is empty.');
        }

        const { head } = this;

        if (this.#lastIndex >= 0) {
            this.#buffer[0] = this.#buffer[this.#lastIndex];
            this.#buffer[this.#lastIndex] = null;
            this.#lastIndex--;
            this.toBottom();
        }

        return head;
    }

    toBottom(cursor = 0) {
        if (this.length <= 1) return;

        let leftChildCursor = this.#getLeftChildIndex(cursor),
            rightChildCursor = this.#getRightChildIndex(cursor);

        const value = this.#buffer[cursor];

        while (leftChildCursor <= this.#lastIndex) {
            let childIndex;

            if (rightChildCursor > this.#lastIndex) {
                childIndex = leftChildCursor;
            } else {
                childIndex =
                    this.#comparator(this.#buffer[leftChildCursor], this.#buffer[rightChildCursor]) > 0 ?
                        leftChildCursor : rightChildCursor;
            }

            const child = this.#buffer[childIndex];

            if (this.#comparator(value, child) >= 0) {
                break;
            }

            this.#buffer[cursor] = child;
            cursor = childIndex;

            leftChildCursor = this.#getLeftChildIndex(cursor);
            rightChildCursor = this.#getRightChildIndex(cursor);
        }

        this.#buffer[cursor] = value;
    }

    fromBottom(cursor = this.#lastIndex) {
        if (this.length <= 1) return;

        const value = this.#buffer[cursor];

        while (cursor > 0) {
            const parentIndex = this.#getParentIndex(cursor),
                  parent = this.#buffer[parentIndex];

            if (this.#comparator(value, parent) <= 0) {
                break;
            }

            this.#buffer[cursor] = parent;
            cursor = parentIndex;
        }

        this.#buffer[cursor] = value;
    }

    #getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    #getLeftChildIndex(index) {
        return index * 2 + 1;
    }

    #getRightChildIndex(index) {
        return index * 2 + 2;
    }

    #validate(comparator) {
        if (typeof comparator !== 'function') {
            throw new TypeError(`${typeof comparator} is not a function.`);
        }
    }
}
