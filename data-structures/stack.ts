// Read about stack and learn its working mechanism and implement it functionality.

class Stack<T> {
    protected _stack: T[];

    constructor () { 
        this._stack = [];
    }

	// set value to stack.
	push(el: T) { 
		this._stack.push(el);
	}

	// get value from stack and remove it
	pop() { 
		return this._stack.pop();
	}

	// should return true when stack is empty, otherwise false
	isEmpty() { 
		return (this._stack.length === 0);
	}
}

const stack = new Stack<number>();
