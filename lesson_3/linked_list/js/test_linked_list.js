describe('Linked list', function() {
    const list = new LinkedList();
    list.addLast(1);
    list.addLast(2);
    list.addLast(3);

    it('list.first.value is equal 1', function() {
        assert.equal(list.first.value, 1);
    });

    it('list.last.value is equal 3', function() {
        assert.equal(list.last.value, 3);
    });

    it('list.first.next.value is equal 2', function() {
        assert.equal(list.first.next.value, 2);
    });

    it('list.first.next.prev.value is equal 1', function() {
        assert.equal(list.first.next.prev.value, 1);
    });

    const resArr = [];

    for (const value of list) {
        resArr.push(value);
    }

    it('Add all values to array through for of cycle', function() {
        assert.equal(resArr.join(', '), '1, 2, 3');
    });
});
