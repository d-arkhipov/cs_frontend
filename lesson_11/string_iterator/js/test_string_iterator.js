describe('String iterator', function() {
    it('In: string \'😀\', out: array [\'😀\']', function() {
        assert.deepEqual([...iterate('😀')], ['😀']);
    });

    it('In: string \'abcd😀ef😎\', out: array [\'a\', \'b\', \'c\', \'d\', \'😀\', \'e\', \'f\', \'😎\']', function() {
        assert.deepEqual([...iterate('abcd😀ef😎')], ['a', 'b', 'c', 'd', '😀', 'e', 'f', '😎']);
    });
});
