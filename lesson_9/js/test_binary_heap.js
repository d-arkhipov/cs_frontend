describe('Binary heap', function() {
    it('Sort in ascending order returned [-43, 1, 3, 6, 10, 11, 23]', function() {
        assert.deepEqual(heapSort([10, 1, -43, 11, 23, 6, 3], (a, b) => a - b), [-43, 1, 3, 6, 10, 11, 23]);
    });

    it('Sort in descending order returned [23, 11, 10, 6, 3, 1, -43]', function() {
        assert.deepEqual(heapSort([10, 1, -43, 11, 23, 6, 3], (a, b) => b - a), [23, 11, 10, 6, 3, 1, -43]);
    });
});
