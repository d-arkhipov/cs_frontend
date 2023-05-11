class Matrix {
    xSize;
    ySize;
    buffer;

    constructor({ xSize, ySize }) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.buffer = new Array(xSize * ySize).fill(0);
    }

    *[Symbol.iterator]() {
        for (let y = 0; y < this.ySize; y++) {
            for (let x = 0; x < this.xSize; x++) {
                yield [{ x, y }, this.get({ x, y })];
            }
        }
    }

    get(coords) {
        return this.buffer[this.#getIndex(coords)];
    }

    set(coords, value) {
        this.buffer[this.#getIndex(coords)] = value;
    }

    visualize() {
        let str = '  | ';

        for (let x = 0; x < this.xSize; x++) {
            str += String.fromCharCode('a'.charCodeAt(0) + x) + ' | ';
        }

        console.log(str);

        for (let y = 0; y < this.ySize; y++) {
            str = String.fromCharCode('a'.charCodeAt(0) + y) + ' | ';

            for (let x = 0; x < this.xSize; x++) {
                str += this.get({ x, y }) + ' | ';
            }

            console.log(str + '\n');
        }
    }

    clone() {
        const newMatrix = new Matrix({ xSize: this.xSize, ySize: this.ySize });
        newMatrix.buffer = this.buffer.slice();

        return newMatrix;
    }

    #getIndex({ x, y }) {
        return y * this.xSize + x;
    }
}
