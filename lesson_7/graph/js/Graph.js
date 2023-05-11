class Graph {
    #size;
    #matrix;
    #vertexList;

    constructor(size) {
        if (typeof size !== 'number' || size < 0) {
            throw new Error(`Size value should be a positive number.`);
        }

        this.#size = size;
        this.#matrix = new Matrix({ xSize: size, ySize: size });
        this.#vertexList = new Map();
        // Заполняем список вершин на основе матрицы смежности
        this.#fillVertexList();
    }

    rel(from, to) {
        this.#validate([from, to]);

        this.#matrix.set({
            y: this.#getPos(from),
            x: this.#getPos(to)
        }, 1);

        console.log(`Added a relation between "${from}" and "${to}"`);
    }

    hasRel(from, to) {
        this.#validate([from, to]);

        let isRel =
            this.#matrix.get({
                y: this.#getPos(from),
                x: this.#getPos(to)
            }) === 1;

        console.log(`Is there a relation between "${from}" and "${to}"?`, isRel);

        return isRel;
    }

    visualize() {
        this.#matrix.visualize();
    }

    createTransitiveClosure() {
        const newGraph = new Graph(this.#size);
        newGraph.#matrix = this.#matrix.clone();

        console.log('Original matrix:');
        newGraph.visualize();

        // Алгоритм Уоршалла, для вычисления транзитивного замыкания
        for (let col = 0; col < this.#size; col++) {
            for (let row = 0; row < this.#size; row++) {
                if (this.#matrix.get({ x: col, y: row }) === 1) {
                    for (let i = 0; i < this.#size; i++) {
                        if (this.#matrix.get({ x: row, y: i }) === 1) {
                            newGraph.#matrix.set({ x: col, y: i }, 1);
                        }
                    }
                }
            }
        }

        console.log('Transitive closure:');
        newGraph.visualize();

        return newGraph;
    }

    depthFirstSearch() {
        console.log('Depth first search:');

        const res = [];
        const stack = new Stack(Array, this.#size);
        this.#vertexList.get(0).isVisited = true;
        res.push(this.#vertexList.get(0).label);
        stack.push(0);

        while(!stack.isEmpty()) {
            let adjacentVertex = this.#getAdjacentUnvisitedVertex(stack.head);

            if (adjacentVertex === -1) {
                stack.pop();
            } else {
                this.#vertexList.get(adjacentVertex).isVisited = true;
                res.push(this.#vertexList.get(adjacentVertex).label);
                stack.push(adjacentVertex);
            }
        }

        this.#resetFlags();

        console.log(res.join(' > '));

        return res.join(' > ');
    }

    breadthFirstSearch() {
        console.log('Breadth first search:');

        const res = [];
        const queue = Queue();
        this.#vertexList.get(0).isVisited = true;
        res.push(this.#vertexList.get(0).label);
        queue.push(0);

        while (queue.head !== null) {
            let head = queue.pop();
            let adjacentVertex;

            while ((adjacentVertex = this.#getAdjacentUnvisitedVertex(head)) !== -1) {
                this.#vertexList.get(adjacentVertex).isVisited = true;
                res.push(this.#vertexList.get(adjacentVertex).label);
                queue.push(adjacentVertex);
            }
        }

        this.#resetFlags();

        console.log(res.join(' > '));

        return res.join(' > ');
    }

    topologicalSort() {
        console.log('Topological sort:');

        const res = new Set;
        const matrix = this.#matrix.clone();
        let vertexList = new Map(this.#vertexList);
        let vertexCnt = vertexList.size;

        while (vertexCnt)  {
            let currentVertex = getVertexWithNoSuccessors();

            if (currentVertex === -1) {
                throw new Error('Graph has cycles.');
            }

            res.add(vertexList.get(currentVertex).label);
            deleteVertex(currentVertex);
        }

        console.log([...res].reverse().join(' > '));

        return [...res].reverse().join(' > ');

        function getVertexWithNoSuccessors() {
            let isEdge;

            for (let row = 0; row < vertexCnt; row++) {
                isEdge = false;

                for (let col = 0; col < vertexCnt; col++) {
                    if (matrix.get({ x: col, y: row }) === 1) {
                        isEdge = true;
                        break;
                    }
                }

                if (!isEdge) return row;
            }

            return -1;
        }

        function deleteVertex(key) {
            if (key !== vertexCnt - 1) {
                vertexList.delete(key);
                vertexList = updKeys(vertexList);
            }

            for (let row = key; row < vertexCnt - 1; row++) {
                moveRowUp(row, vertexCnt);
            }

            for (let col = key; col < vertexCnt - 1; col++) {
                moveColLeft(col, vertexCnt);
            }

            vertexCnt--;
        }

        function moveRowUp(row, length) {
            for (let col = 0; col < length; col++) {
                matrix.set({ x: col, y: row }, matrix.get({ x: col, y: row + 1 }));
            }
        }

        function moveColLeft(col, length) {
            for (let row = 0; row < length; row++) {
                matrix.set({ x: col, y: row }, matrix.get({ x: col + 1, y: row }));
            }
        }

        function updKeys(map) {
            let tmp = new Map();
            let counter = 0;

            map.forEach((el) => {
                tmp.set(counter++, el);
            });

            return tmp;
        }
    }

    #getPos(label) {
        return label.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    #validate(vertexes) {
        vertexes.forEach(vertex => {
            if (typeof vertex !== 'string' || vertex.length > 1 || (vertex.charCodeAt(0) - 'a'.charCodeAt(0) + 1 > this.#size)) {
                throw new Error(
                    `Vertex value should be a single latin letter from "a" to "${String.fromCharCode('a'.charCodeAt(0) + this.#size - 1)}".`
                );
            }
        });
    }

    #fillVertexList() {
        for (let i = 0; i < this.#size; i++) {
            this.#addVertex(String.fromCharCode('a'.charCodeAt(0) + i));
        }
    }

    #addVertex(label) {
        this.#vertexList.set(this.#vertexList.size, new Vertex(label));
    }

    #getAdjacentUnvisitedVertex(row) {
        for (let col = 0; col < this.#size; col++) {
            if (this.#matrix.get({ x: col, y: row }) === 1 && !this.#vertexList.get(col).isVisited) {
                return col;
            }
        }

        return -1;
    }

    #resetFlags() {
        for (let value of this.#vertexList.values()) {
            value.isVisited = false;
        }
    }
}
