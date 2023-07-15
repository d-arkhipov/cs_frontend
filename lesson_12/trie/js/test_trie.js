describe('Trie', function() {
    const trie = new Trie();

    trie.addWord('meat');

    it('Added the word "meat"', function() {
        assert.isOk(true);
    });

    trie.addWord('world');

    it('Added the word "world"', function() {
        assert.isOk(true);
    });

    it('Trie contains the word "meat"', function() {
        assert.equal(trie.go('m').go('e').go('a').go('t').isWord, true);
    });

    it('Trie contains the word "world"', function() {
        assert.equal(trie.go('w').go('o').go('r').go('l').go('d').isWord, true);
    });

    it('Trie doesn\'t contains the word "sea"', function() {
        assert.equal(trie.go('s').go('e').go('a').isWord, false);
    });
});
