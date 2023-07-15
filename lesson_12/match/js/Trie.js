class Trie {
    #root = new TrieNode([]);

    addWord(iterable) {
        let cursor = this.#root,
            wildcard = null;

        for (const str of iterable) {
            wildcard = cursor.children.get('*') ?? null;

            if (wildcard == null) {
                wildcard = createNode('*');
            }

            let child = cursor.children.get(str);

            if (child == null) {
                child = createNode(str);
                wrapMapSet(child.children, wildcard.children);
            }

            cursor = child;
        }

        if (wildcard != null) {
            cursor.word = true;
            wildcard.aliases.push(cursor.value);
        }

        function wrapMapSet(map, wildcardMap) {
            const { set } = map;

            Object.defineProperty(map, 'set', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: (key, value) => {
                    wildcardMap.set(key, [].concat(wildcardMap.get(key) ?? [], value));
                    return set.call(map, key, value);
                }
            });

            return map;
        }

        function createNode(value) {
            const node = new TrieNode(cursor.value.concat(value));
            cursor.children.set(value, node);

            return node;
        }
    }

    go(value) {
        return new TrieView([this.#root]).go(value);
    }
}
