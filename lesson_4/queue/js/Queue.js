function Queue() {
    class Queue {
        constructor() {
            this.linkedList = new LinkedList();
        }

        push(val) {
            if (typeof val !== 'number') {
                throw new Error(`You can only add a number. "${typeof val}" given.`);
            }

            this.linkedList.addLast(val);
        }

        pop() {
            const first = this.linkedList.first;

            if (!first) {
                throw new Error('Can\'t pop. The queue is empty.');
            }

            this.linkedList.removeFirst();

            return first.value;
        }

        get head() {
            return this.linkedList.first ? this.linkedList.first.value : null;
        }
    }

    return new Queue();
}
