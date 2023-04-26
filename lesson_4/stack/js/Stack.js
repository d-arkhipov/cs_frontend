function Stack(typedArray, maxSize) {
    class Stack {
        constructor(typedArray, maxSize) {
            if (typeof typedArray !== 'function') {
                throw new Error('The first parameter should be a constructor.');
            }

            if (typeof maxSize !== 'number') {
                throw new Error('The second parameter should be a number.');
            }

            this.stackTypedArray = new typedArray(maxSize);
            this.maxSize = maxSize;
            this.top = -1;
        }

        get head() {
            if (this.isEmpty()) {
                throw new Error('The stack is empty.');
            }

            return this.stackTypedArray[this.top];
        }

        push(val) {
            if (typeof val !== 'number') {
                throw new Error(`You can only add a number. "${typeof val}" given.`);
            }

            if (this.isFull()) {
                throw new Error('Can\'t push, the stack is full.');
            }

            this.stackTypedArray[++this.top] = val;
        }

        pop() {
            if (this.isEmpty()) {
                throw new Error('Can\'t pop. The stack is empty.');
            }

            return this.stackTypedArray[this.top--];
        }

        isEmpty() {
            return (this.top === -1);
        }

        isFull() {
            return this.top === this.maxSize - 1;
        }
    }

    return new Stack(typedArray, maxSize);
}
