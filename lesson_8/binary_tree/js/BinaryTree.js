class BinaryTree {
    root;
    comparator;

    constructor(rootValue, comparator) {
        this.root = new BinaryTreeNode(rootValue, { comparator });
        this.comparator = comparator;
    }

    add(value) {
        this.#validateValue(value);

        const { comparator } = this;

        return recAdd(this.root);

        function recAdd(node) {
            if (node == null) return null;

            const comp = comparator(value, node.value);

            if (comp < 0) {
                if (node.leftChild == null) {
                    node.leftChild = new BinaryTreeNode(value, { comparator, parent: node });
                } else {
                    recAdd(node.leftChild);
                }

                return;
            }

            if (comp > 0) {
                if (node.rightChild == null) {
                    node.rightChild = new BinaryTreeNode(value, { comparator, parent: node });
                } else {
                    recAdd(node.rightChild);
                }
            }
        }
    }

    find(value) {
        this.#validateValue(value);

        const { comparator } = this;

        return recFind(this.root);

        function recFind(node) {
            if (node == null) return;

            const comp = comparator(value, node.value);

            if (comp === 0) {
                return node;
            }

            if (comp < 0) {
                return recFind(node.leftChild);
            }

            if (comp > 0) {
                return recFind(node.rightChild);
            }
        }
    }

    remove(value) {
        this.#validateValue(value);

        const that = this,
              nodeToRemove = this.find(value);

        if (nodeToRemove == null) return null;

        const nodeToReplace = max(nodeToRemove.leftChild) ?? min(nodeToRemove.rightChild);

        if (nodeToReplace == null) {
            removeFromParent(nodeToRemove);
        } else {
            removeFromParent(nodeToReplace);
            nodeToReplace.setParent(nodeToRemove.parent);

            if (nodeToRemove.parent == null) {
                this.root = nodeToReplace;
            }

            if (nodeToRemove.leftChild != null) {
                if (nodeToReplace.leftChild == null) {
                    nodeToReplace.setLeftChild(nodeToRemove.leftChild);
                } else {
                    const leaf = min(nodeToReplace.leftChild);
                    leaf.setLeftChild(nodeToRemove.leftChild);
                }
            }

            if (nodeToRemove.rightChild != null) {
                if (nodeToReplace.rightChild == null) {
                    nodeToReplace.setRightChild(nodeToRemove.rightChild);
                } else {
                    const leaf = max(nodeToReplace.rightChild);
                    leaf.setRightChild(nodeToRemove.rightChild);
                }
            }

            return nodeToRemove;
        }

        function min(node) {
            if (node == null) return null;

            return node.leftChild == null ? node : min(node.leftChild);
        }

        function max(node) {
            if (node == null) return null;

            return node.rightChild == null ? node : max(node.rightChild);
        }

        function removeFromParent(node) {
            if (node == null) return null;

            const { parent } = node;
            node.remove();

            if (parent == null) {
                that.root = null;
            }
        }
    }

    // Симметричный обход
    inOrder() {
        return iterate(this.root);

        function* iterate(node) {
            if (node == null) return;

            yield* iterate(node.leftChild);
            yield node.value;
            yield* iterate(node.rightChild);
        }
    }

    // Прямой обход
    preOrder() {
        return iterate(this.root);

        function* iterate(node) {
            if (node == null) return;

            yield node.value;
            yield* iterate(node.leftChild);
            yield* iterate(node.rightChild);
        }
    }

    // Обратный обход
    postOrder() {
        return iterate(this.root);

        function* iterate(node) {
            if (node == null) return;

            yield* iterate(node.leftChild);
            yield* iterate(node.rightChild);
            yield node.value;
        }
    }

    #validateValue(value) {
        if (value == null) {
            throw new Error('The value is empty.');
        }
    }
}
