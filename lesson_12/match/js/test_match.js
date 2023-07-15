describe('Match', function() {
    it(
        'Pattern: \'foo.*.bar.**\',' +
        ' strings array: [\'foo\', \'foo.bla.bar.baz\', \'foo.bag.bar.ban.bla\'].' +
        ' Function returned: [\'foo.bla.bar.baz\', \'foo.bag.bar.ban.bla\']',
        function() {
            assert.deepEqual(
                match('foo.*.bar.**', ['foo', 'foo.bla.bar.baz', 'foo.bag.bar.ban.bla']), ['foo.bla.bar.baz', 'foo.bag.bar.ban.bla'])
            ;
        }
    );
});
