'use strict';

function heapSort(arr, comparator) {
    const heap = new BinaryHeap(comparator, arr);

    for (let i = Math.floor(arr.length / 2); i--;) {
        heap.toBottom(i);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[arr.length - 1 - i] = heap.pop();
    }

    return arr;
}
