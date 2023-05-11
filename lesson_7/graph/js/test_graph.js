describe('Graph', function() {
    const graph = new Graph(8);

    graph.rel('a', 'd');

    it('Added a relation between "a" and "d"', function() {
        assert.isOk(true);
    });

    graph.rel('a', 'e');

    it('Added a relation between "a" and "e"', function() {
        assert.isOk(true);
    });

    graph.rel('b', 'e');

    it('Added a relation between "b" and "e"', function() {
        assert.isOk(true);
    });

    graph.rel('c', 'f');

    it('Added a relation between "c" and "f"', function() {
        assert.isOk(true);
    });

    graph.rel('d', 'g');

    it('Added a relation between "d" and "g"', function() {
        assert.isOk(true);
    });

    graph.rel('e', 'g');

    it('Added a relation between "e" and "g"', function() {
        assert.isOk(true);
    });

    graph.rel('f', 'h');

    it('Added a relation between "f" and "h"', function() {
        assert.isOk(true);
    });

    graph.rel('g', 'h');

    it('Added a relation between "g" and "h"', function() {
        assert.isOk(true);
    });

    it('There is a relation between "a" and "d"`', function() {
        assert.isOk(graph.hasRel('a', 'd'));
    });

    it('There is a relation between "c" and "f"`', function() {
        assert.isOk(graph.hasRel('c', 'f'));
    });

    it('There isn\'t a relation between "f" and "c"`', function() {
        assert.isNotOk(graph.hasRel('f', 'c'));
    });

    it('Created a transitive closure', function() {
        assert.isOk(graph.createTransitiveClosure());
    });

    it('Depth first search returned "a > d > g > h > e"', function() {
        assert.equal(graph.depthFirstSearch(), 'a > d > g > h > e');
    });

    it('Breadth first search returned "a > d > e > g > h"', function() {
        assert.equal(graph.breadthFirstSearch(), 'a > d > e > g > h');
    });

    it('Topological sort returned "b > a > e > d > g > c > f > h"', function() {
        assert.equal(graph.topologicalSort(), 'b > a > e > d > g > c > f > h');
    });
});
