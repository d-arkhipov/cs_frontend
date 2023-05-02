class Matrix3D {
    #axesSizes;
    #buffer;

    constructor(axesSizes) {
        this.#axesSizes = axesSizes;
        this.#validate(axesSizes);
        this.#buffer = new Array(axesSizes.x * axesSizes.y * axesSizes.z).fill(null);
    }

    set(axesValues, val) {
        if (!val || typeof val !== 'number') {
            throw new Error(`The second parameter "val" is missed.`);
        }

        this.#validate(axesValues, true);
        this.#buffer[this.#getIndex(axesValues)] = val;
    }

    get(axesValues) {
        this.#validate(axesValues, true);

        return this.#buffer[this.#getIndex(axesValues)];
    }

    #getIndex({ x, y, z }) {
        // (Кол-во строк * кол-во столбцов * номер плоскости) + номер строки * кол-во столбцов + номер столбца
        return this.#axesSizes.y * this.#axesSizes.x * z + y * this.#axesSizes.x + x;
    }

    #validate(coords, isFromMethod = false) {
        ['x', 'y', 'z'].forEach(axis => {
            if (!coords[axis] || typeof coords[axis] !== 'number' || coords[axis] < 0) {
                throw new Error(`Axis "${axis}" value should be a positive number.`);
            }

            if (isFromMethod && coords[axis] > this.#axesSizes[axis]) {
                throw new Error(`The value of axis "${axis}" can't be more, than it's size "${this.#axesSizes[axis]}".`);
            }
        });
    }
}
