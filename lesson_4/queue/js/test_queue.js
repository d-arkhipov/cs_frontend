describe('Queue', function() {
    const queue = Queue();

    queue.push(10);

    it('Pushed number 10', function() {
        assert.isOk(true);
    });

    queue.push(11);

    it('Pushed number 11', function() {
        assert.isOk(true);
    });

    queue.push(12);

    it('Pushed number 12', function() {
        assert.isOk(true);
    });

    it('The head is equal to 10', function() {
        assert.equal(queue.head, 10);
    });

    it('Pop returned 10', function() {
        assert.equal(queue.pop(), 10);
    });

    it('The head is equal to 11', function() {
        assert.equal(queue.head, 11);
    });

    it('Pop returned 11', function() {
        assert.equal(queue.pop(), 11);
    });

    it('Pop returned 12', function() {
        assert.equal(queue.pop(), 12);
    });

    it('Error. The queue is empty', function() {
        assert.throws(() => queue.pop(), 'Can\'t pop. The queue is empty.');
    });
});

describe('Dequeue', function() {
    const dequeue = Dequeue();

    dequeue.push(10);

    it('Pushed number 10', function() {
        assert.isOk(true);
    });

    dequeue.unshift(11);

    it('Unshifted number 11', function() {
        assert.isOk(true);
    });

    dequeue.push(12);

    it('Pushed number 12', function() {
        assert.isOk(true);
    })

    it('Pop returned 12', function() {
        assert.equal(dequeue.pop(), 12);
    });

    it('Shift returned 11', function() {
        assert.equal(dequeue.shift(), 11);
    });

    it('Pop returned 10', function() {
        assert.equal(dequeue.pop(), 10);
    });

    it('Error. The queue is empty', function() {
        assert.throws(() => dequeue.pop(), 'Can\'t pop. The queue is empty.');
    });
});
