function Dequeue() {
    class Dequeue {
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
            const last = this.linkedList.last;

            if (!last) {
                throw new Error('Can\'t pop. The queue is empty.');
            }

            this.linkedList.removeLast();

            return last.value;
        }

        unshift(val) {
            if (typeof val !== 'number') {
                throw new Error(`You can only add a number. "${typeof val}" given.`);
            }

            this.linkedList.addFirst(val);
        }

        shift() {
            const first = this.linkedList.first;

            if (!first) {
                throw new Error('Can\'t pop, the queue is empty.');
            }

            this.linkedList.removeFirst();

            return first.value;
        }

        get head() {
            return this.linkedList.first ? this.linkedList.first.value : null;
        }
    }

    return new Dequeue();
}
