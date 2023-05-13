describe('Binary search', function() {
    it('The first index of the element 7 in the array [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9] is equal to 6', function() {
        assert.equal(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7), 6);
    });

    it('The last index of the element 7 in the array [1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9] is equal to 9', function() {
        assert.equal(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7), 9);
    });
});
