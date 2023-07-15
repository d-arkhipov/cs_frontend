class TrieView {
    #start;
    constructor(start) {
        this.#start = start;
    }

    get isDone() {
        return this.#start.length === 0;
    }

    get words() {
        if (this.isDone) {
            return [];
        }

        return this.#start.flatMap(({ word, value, aliases }) => word ? [value] : aliases);
    }

    go(value) {
        if (this.isDone) {
            return this;
        }

        return new TrieView(
            this.#start.flatMap(({ children }) => children.get(value) ?? [])
        );
    }
}
