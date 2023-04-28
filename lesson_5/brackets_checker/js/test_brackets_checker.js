describe('Brackets checker', function() {
    it('String "(hello{world} and [me])" is valid', function() {
        assert.isTrue(isValid('(hello{world} and [me])'));
    });

    it('String "(hello{world)} and [me])" is not valid', function() {
        assert.isNotTrue(isValid('(hello{world)} and [me])'));
    });

    it('String ")" is not valid', function() {
        assert.isNotTrue(isValid(')'));
    });
});
