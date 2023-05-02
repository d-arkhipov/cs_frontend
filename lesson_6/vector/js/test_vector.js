describe('Vector', function() {
    const uint8Vector = new Vector(Uint8Array, { capacity: 100 });

    it('Pushed number 100.The length is 1', function() {
        assert.equal(uint8Vector.push(100), 1);
    });

    it('Pushed numbers: 20, 10. The length is 3', function() {
        assert.equal(uint8Vector.push(20, 10), 3);
    });

    it('Pop returned 10', function() {
        assert.equal(uint8Vector.pop(), 10);
    });

    it('Shift returned 100', function() {
        assert.equal(uint8Vector.shift(), 100);
    });

    it('Unshifted number 1.The length is 2', function() {
        assert.equal(uint8Vector.unshift(1), 2);
    });

    it('The length is equal to 2', function() {
        assert.equal(uint8Vector.length, 2);
    });
});
