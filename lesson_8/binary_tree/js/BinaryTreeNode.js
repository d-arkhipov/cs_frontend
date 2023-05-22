class BinaryTreeNode {
    value;
    comparator;

    parent;
    leftChild;
    rightChild;

    constructor(
        value,
        {
            comparator,
            parent = null,
            leftChild = null,
            rightChild = null
        }
    ) {
        this.#validate(value, comparator);

        this.value = value;
        this.comparator = comparator;

        this.parent = parent;
        this.leftChild = leftChild
        this.rightChild = rightChild;
    }

    remove() {
        if (this.parent == null) return;

        if (this.parent.leftChild === this) {
            this.parent.leftChild = null;
        } else {
            this.parent.rightChild = null;
        }

        this.parent = null;
    }

    setParent(parent) {
        this.remove();

        if (parent == null) return;

        this.parent = parent;

        if (this.comparator(this.value, parent.value) > 0) {
            parent.rightChild = this;
        } else {
            parent.leftChild = this;
        }
    }

    setLeftChild(child) {
        if (child == null) {
            this.leftChild = null
        } else {
            child.setParent(this);
        }
    }

    setRightChild(child) {
        if (child == null) {
            this.rightChild = null;
        } else {
            child.setParent(this);
        }
    }

    #validate(value, comparator) {
        if (value == null) {
            throw new Error('The value is empty.');
        }

        if (typeof comparator !== 'function') {
            throw new TypeError(`${typeof comparator} is not a function.`);
        }
    }
}
