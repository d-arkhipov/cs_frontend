describe('Coder', function() {
    const data = [2, 3, true, false, 'ab'];
    const schema = [
        [3, 'number'],  // 3 бита число
        [3, 'number'],  // 3 бита число
        [1, 'boolean'], // 1 бит логический
        [1, 'boolean'], // 1 бит логический
        [16, 'ascii']   // 16 бит 2 аски символа
    ];
    let coder = new Coder();
    let result = coder.encode(data, schema);
    let uInt8Arr = new Uint8Array(result);

    it('Encode array data by schema, byte 1', function() {
        assert.equal(uInt8Arr[0].toString(2), '1001110'); // decimal 78
    });

    it('Encode array data by schema, byte 2', function() {
        assert.equal(uInt8Arr[1].toString(2), '1100001'); // decimal 97
    });

    it('Encode array data by schema, byte 3', function() {
        assert.equal(uInt8Arr[2].toString(2), '1100010'); // decimal 98
    });

    it('Decode array data by schema', function() {
        assert.equal(coder.decode(result, schema).join(', '), [2, 3, true, false, 'ab'].join(', '));
    });
});
