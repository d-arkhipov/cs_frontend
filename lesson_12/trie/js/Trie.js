class Trie {
    #buffer = [new TrieNode('')];

    addWord(iterable) {
        if (!iterable) {
            return false;
        }

        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError('Parameter is not iterable.');
        }

        let cursor = 0;

        for (const str of iterable) {
            const current = this.#buffer[cursor],
                  childIndex = current.children.get(str);

            if (childIndex != null) {
                cursor = childIndex;
            } else {
                const node = new TrieNode(str);
                const pointer = this.#buffer.push(node) - 1;
                current.children.set(str, pointer);
                cursor = pointer;
            }
        }

        if (cursor) {
            this.#buffer[cursor].word = true;
        }
    }

    go(value) {
        return new TrieView(0, this.#buffer).go(value);
    }
}
