class LinkedList {
    first = null;
    last = null;

    addFirst(value) {
        const node = new Node(value);

        if (!this.last) {
            this.last = node;
        } else {
            this.first.prev = node;
            node.next = this.first;
        }

        this.first = node;
    }

    addLast(value) {
        const node = new Node(value);

        if (!this.first) {
            this.first = node;
        } else {
            node.prev = this.last;
            this.last.next = node;
        }

        this.last = node;
    }

    removeFirst() {
        if (this.first) {
            this.first = this.first.next;

            if (this.first) {
                this.first.prev = null;
            } else {
                this.last = null;
            }
        }
    }

    removeLast() {
        if (this.last) {
            this.last = this.last.prev;

            if (this.last) {
                this.last.next = null;
            } else {
                this.first = null;
            }
        }
    }

    search(searchValue) {
        let searchNode = this.first;

        while (searchNode) {
            if (searchNode.value === searchValue) return searchNode;

            searchNode = searchNode.next;
        }

        return null;
    }

    insertAfter(searchValue, value) {
        let searchNode = this.search(searchValue);

        if (searchNode) {
            const node = new Node(value);

            if (searchNode === this.last) this.last = node;

            node.prev = searchNode;
            node.next = searchNode.next;
            searchNode.next.prev = node;
            searchNode.next = node;
        }
    }

    [Symbol.iterator]() {
        this.current = this.first;
        return this;
    }

    next() {
        if (this.current) {
            const value = this.current.value;
            this.current = this.current.next;

            return { done: false, value: value };
        } else {
            return { done: true };
        }
    }
}
