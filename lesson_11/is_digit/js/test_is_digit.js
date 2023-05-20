describe('Is digit', function() {
    it('The string "123" contains only numeric values', function() {
        assert.equal(isDigit('123'), true);
    });

    it('The string "123b" contains not only numeric values', function() {
        assert.equal(isDigit('123b'), false);
    });

    it('The string "Ⅻ" contains only numeric values', function() {
        assert.equal(isDigit('Ⅻ'), true);
    });

    it('The string "ⅤⅡ" contains only numeric values', function() {
        assert.equal(isDigit('ⅤⅡ'), true);
    });

    it('The string "Ⅴ Ⅱ" contains not only numeric values', function() {
        assert.equal(isDigit('Ⅴ Ⅱ '), false);
    });
});
