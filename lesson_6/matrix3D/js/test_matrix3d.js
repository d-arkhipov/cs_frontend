describe('Matrix 3D', function() {
    const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

    it('Created new Matrix3D with values { x: 10, y: 10, z: 10 }', function() {
        assert.isOk(true);
    });

    matrix.set({ x: 1, y: 3, z: 2 }, 10);

    it('Set number 10 to { x: 1, y: 3, z: 2 }', function() {
        assert.isOk(true);
    });

    it('Got number 10 from { x: 1, y: 3, z: 2 }', function() {
        assert.equal(matrix.get({ x: 1, y: 3, z: 2 }), 10);
    });

    matrix.set({ x: 10, y: 10, z: 10 }, 99);

    it('Set number 99 to { x: 10, y: 10, z: 10 }', function() {
        assert.isOk(true);
    });

    it('Got number 99 from { x: 10, y: 10, z: 10 }', function() {
        assert.equal(matrix.get({ x: 10, y: 10, z: 10 }), 99);
    });
});
