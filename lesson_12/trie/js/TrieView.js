class TrieView {
    #start;
    #buffer;

    constructor(start, buffer) {
        this.#start = start;
        this.#buffer = buffer;
    }

    go(value) {
        if (this.#start === -1 || this.#buffer[this.#start] == null) {
            return this;
        }

        return new TrieView(this.#buffer[this.#start].children.get(value) ?? -1, this.#buffer);
    }

    get isWord() {
        if (this.#start === -1 || this.#buffer[this.#start] == null) {
            return false;
        }

        return this.#buffer[this.#start].word;
    }
}
