describe('Hash map', function() {
    const map = new HashMap(120);

    it('Created new HashMap with capacity 120', function() {
        assert.isOk(true);
    });

    map.set('foo', 1);

    it('Set: key \'foo\', value 1', function() {
        assert.isOk(true);
    });

    map.set(42, 10);

    it('Set: key 42, value 10', function() {
        assert.isOk(true);
    });

    map.set(document, 100);

    it('Set: key document, value 100', function() {
        assert.isOk(true);
    });

    it('Got value 10 by key 42', function() {
        assert.equal(map.get(42), 10);
    });

    it('HashMap has an item with key document', function() {
        assert.equal(map.has(document), true);
    });

    it('Deleted an item with key document. Returned it\'s value 100', function() {
        assert.equal(map.delete(document), 100);
    });

    it('HashMap hasn\'t an item with key document', function() {
        assert.equal(map.has(document), false);
    });
});
