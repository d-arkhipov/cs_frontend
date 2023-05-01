describe('Collapse', function() {
    const objOne = {
     a: {
       b: [1, 2],
       '': {c: 2}
     }
   };

    const objTwo = {
        a: {
            b: [1, 2],
            '': { c: 2 }
        },
        z: { e: 3 },
        w: ['four', 5]
    };

    it('The structure of the object, after recursion collapsing, is equal to {a.b.0: 1, a.b.1: 2, a..c: 2}', function() {
        assert.equal(JSON.stringify(collapseByRecursion(objOne)), '{"a.b.0":1,"a.b.1":2,"a..c":2}');
    });

    it('The structure of the object, after recursion collapsing, is equal to {a.b.0: 1, a.b.1: 2, a..c: 2, z.e: 3, w.0: \'four\', w.1: 5}', function() {
        assert.equal(JSON.stringify(collapseByRecursion(objTwo)), '{"a.b.0":1,"a.b.1":2,"a..c":2,"z.e":3,"w.0":"four","w.1":5}');
    });

    it('The structure of the object, after stack collapsing, is equal to {a.b.0: 1, a.b.1: 2, a..c: 2}', function() {
        assert.equal(JSON.stringify(collapseByStack(objOne)), '{"a.b.0":1,"a.b.1":2,"a..c":2}');
    });

    it('The structure of the object, after stack collapsing, is equal to {a.b.0: 1, a.b.1: 2, a..c: 2, z.e: 3, w.0: \'four\', w.1: 5}', function() {
        assert.equal(JSON.stringify(collapseByStack(objTwo)), '{"a.b.0":1,"a.b.1":2,"a..c":2,"z.e":3,"w.0":"four","w.1":5}');
    });
});
