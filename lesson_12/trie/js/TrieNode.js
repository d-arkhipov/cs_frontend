class TrieNode {
    word;
    value;
    children = new Map();

    constructor(char, word) {
        this.value = char;
        this.word = word;
    }
}
