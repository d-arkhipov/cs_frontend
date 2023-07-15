class TrieNode {
    word;
    value;
    aliases = [];
    children = new Map();

    constructor(value, word = false) {
        this.value = value;
        this.word = word;
    }
}
