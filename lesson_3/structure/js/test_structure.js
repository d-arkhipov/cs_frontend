describe('Structure', function() {
    const jackBlack = Structure([
        ['name', 'utf16', 10],
        ['lastName', 'utf16', 10],
        ['age', 'u16']
    ]);

    jackBlack.set('name', 'Jack');
    jackBlack.set('lastName', 'Black');
    jackBlack.set('age', 53);

    it('The name is "Jack"', function() {
        assert.equal(jackBlack.get('name'), 'Jack');
    });

    it('The last name is "Black"', function() {
        assert.equal(jackBlack.get('lastName'), 'Black');
    });

    it('The age is equal to 53', function() {
        assert.equal(jackBlack.get('age'), 53);
    });
});
