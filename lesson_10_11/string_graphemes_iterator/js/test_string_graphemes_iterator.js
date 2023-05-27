describe('String graphemes iterator', function() {
    it('In: string \'1😃à👩🏽‍❤️‍💋‍👨\', out: array [\'1\', \'😃\', \'à\', \'👩🏽‍❤️‍💋‍👨\']', function() {
        assert.deepEqual([...iterateGraphemes('1😃à👩🏽‍❤️‍💋‍👨')], ['1', '😃', 'à', '👩🏽‍❤️‍💋‍👨']);
    });

    it('In: string \'👨‍💻¾̀👩🏽‍❤️‍💋‍👨🇨🇦4👨‍👩‍👧‍👦\', out: array [\'👨‍💻\', \'¾̀\', \'👩🏽‍❤️‍💋‍👨\', \'🇨🇦\', \'4\', \'👨‍👩‍👧‍👦\']', function() {
        assert.deepEqual([...iterateGraphemes('👨‍💻¾👩🏽‍❤️‍💋‍👨🇨🇦4👨‍👩‍👧‍👦')], ['👨‍💻', '¾', '👩🏽‍❤️‍💋‍👨', '🇨🇦', '4', '👨‍👩‍👧‍👦']);
    });
});
