// Read about queue and learn its working mechanism and implement it functionality.

class Queue<T> {
    protected _queue: T[];

    constructor() {
        this._queue = [];
    }

    // set value to queue
    enqueue(el: T) {
        this._queue.push(el);
    }

    // remove value from queue
    dequeue() {
        return this._queue.shift();
    }

    // should return true when queue is empty, otherwise false
    isEmpty() {
        return (this._queue.length === 0);
    }
}

const queue = new Queue<number>();
