describe('Bit access', function() {
    let bitAccessor = new BitAccessor(new Uint8Array([0b1110, 0b1101]));

    it('Get bit 1 from element 0', function() {
        let result = bitAccessor.get(0, 1);

        assert.equal(result, 1);
    });

    it('Get bit 1 from element 1', function() {
        let result = bitAccessor.get(1, 1);

        assert.equal(result, 0);
    });

    it('Clear bit 1 in element 0', function() {
        bitAccessor.set(0, 1, 0);
        let result = bitAccessor.get(0, 1);

        assert.equal(result, 0);
    });
});
