class BitAccessor {
    constructor(typedArray) {
        this.typedArray = typedArray;
    }

    validate(elIndex, bitNum, newVal = 0) {
        if (isNaN(elIndex) || isNaN(bitNum) || isNaN(newVal)) {
            throw new Error(`Params should be a number.`);
        }

        if (elIndex > this.typedArray.length - 1) {
            throw new Error(`Index of element should be from 0 to ${this.typedArray.length - 1}.`);
        }

        if (bitNum < 0 || bitNum > 7) {
            throw new Error('Bit number should be from 0 to 7.');
        }

        if (!~[0, 1].indexOf(newVal)) {
            throw new Error('Inserted value should be equal 0 or 1.');
        }
    }

    get(elIndex, bitPos) {
        this.validate(elIndex, bitPos);

        return (this.typedArray[elIndex] >> bitPos) & 1;
    }

    set(elIndex, bitPos, newBitVal) {
        this.validate(elIndex, bitPos, newBitVal);

        this.typedArray[elIndex] =
            newBitVal === 1 ?
                (1 << bitPos) | this.typedArray[elIndex] :
                ~(1 << bitPos) & this.typedArray[elIndex]
    }
}
