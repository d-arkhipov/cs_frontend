describe('Binary tree', function() {
    const tree = new BinaryTree(15, (a, b) => a - b);

    tree.add(13);
    tree.add(9);
    tree.add(7);
    tree.add(3);

    tree.add(18);
    tree.add(23);
    tree.add(20);
    tree.add(21);

    it('Added numbers: 13, 9, 7, 3, 18, 23, 20, 21', function() {
        assert.isOk(true);
    });
    
    it('inOrder returned [3, 7, 9, 13, 15, 18, 20, 21, 23]', function() {
        assert.deepEqual([...tree.inOrder()], [3, 7, 9, 13, 15, 18, 20, 21, 23]);
    });

    it('preOrder returned [15, 13, 9, 7, 3, 18, 23, 20, 21]', function() {
        assert.deepEqual([...tree.preOrder()], [15, 13, 9, 7, 3, 18, 23, 20, 21]);
    });

    it('postOrder returned [3, 7, 9, 13, 21, 20, 23, 18, 15]', function() {
        assert.deepEqual([...tree.postOrder()], [3, 7, 9, 13, 21, 20, 23, 18, 15]);
    });

    it('Value 18 found', function() {
        assert.equal(tree.find(18).value, 18);
    });

    it('Value 18 removed', function() {
        assert.equal(tree.remove(18).value, 18);
    });

    it('inOrder returned [3, 7, 9, 13, 15, 20, 21, 23]', function() {
        assert.deepEqual([...tree.inOrder()], [3, 7, 9, 13, 15, 20, 21, 23]);
    });
});
