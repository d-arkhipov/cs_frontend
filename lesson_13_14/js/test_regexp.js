describe('Regular expressions', function() {
    it('The string "I_saved_25$" contains only Latin letters, numbers, underscores and the dollar sign', function() {
        assert.equal(wordDollar.test('I_saved_25$'), true);
    });

    it('The string "привет" contains other than Latin letters, numbers, underscores and the dollar sign', function() {
        assert.equal(wordDollar.test('привет'), false);
    });

    it("The split method returned ['762120', '763827', '750842', '749909', '755884']", function() {
        assert.deepEqual(
            '762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(separator, 5),
            ['762120', '763827', '750842', '749909', '755884']);
    });

    it('The matchAll method returned iterator', function() {
        assert.equal(Object.prototype.toString.call('{"a": 1, "b": "2"}'.matchAll(objSplitter)), '[object RegExp String Iterator]');
    });

    it('The format function returned "Hello, Bob! Your age is 10."', function() {
        assert.equal(format('Hello, ${user}! Your age is ${age}.', { user: 'Bob', age: 10 }), 'Hello, Bob! Your age is 10.');
    });

    it('The calc function returned a string with the calculated values', function() {
        assert.equal(
            calc(`
            Какой-то текст (10 + 15 - 24) ** 2
            Еще какой-то текст 2 * 10`),
            `
            Какой-то текст 1
            Еще какой-то текст 20`
        );
    });
});
