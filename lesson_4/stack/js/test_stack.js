describe('Stack', function() {
    const stack = Stack(Int32Array, 10);

    stack.push(10);

    it('Pushed number 10', function() {
        assert.isOk(true);
    });

    stack.push(11);

    it('Pushed number 11', function() {
        assert.isOk(true);
    });

    stack.push(12);

    it('Pushed number 12', function() {
        assert.isOk(true);
    });

    it('The head is equal to 12', function() {
        assert.equal(stack.head, 12);
    });

    it('Pop returned 12', function() {
        assert.equal(stack.pop(), 12);
    });

    it('The head is equal to 11', function() {
        assert.equal(stack.head, 11);
    });

    it('Pop returned 11', function() {
        assert.equal(stack.pop(), 11);
    });

    it('Pop returned 10', function() {
        assert.equal(stack.pop(), 10);
    });

    it('Error. The stack is empty', function() {
        assert.throws(() => stack.pop(), 'Can\'t pop. The stack is empty.');
    });
});
