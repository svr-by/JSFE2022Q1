// Read about linked lists and its working mechanism and implement it functionality.

class LinkedNode<T> {
	value: T;
	next: LinkedNode<T> | null;;

	constructor (value: T) {
        this.value = value;
        this.next = null;
	}
}

class LinkedList<T> {
	head: LinkedNode<T> | null;

	constructor () {
        this.head = null;
	}

	// add value to linked list
	insert(value: T) {
		const newNode = new LinkedNode(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			let temp = this.head;
			while(temp.next) {
				temp = temp.next;
			}
			temp.next = newNode;
		}
	}

	// * add value to the top of linked list
	insertFirst(value: T) {
		const newNode = new LinkedNode(value);
		if (!this.head) {
			this.head = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
	}

    // remove first value from linked list
	removeFirst() {
		if (this.head) {
			this.head = this.head.next;
		}
	}

    // * remove value by key from linked list
	removeAt(key: number) {
        let current = this.find(key - 1) as LinkedNode<T>;
        if (current) {
            if (current.next) {
                current.next = current.next.next;
            }
        }
	}

    // get value by key from linked list
	find(key: number): LinkedNode<T> | void {
        if (this.head) {
            let temp = this.head;

            for (let i = 0; i < key; i++) {
                if (temp.next) {
                    temp = temp.next;
                } else {
                    return;
                }
            }

            return temp;
        }		
	}

    // * remove all duplicated values
	clearDuplicates() {
		if (this.head) {
            let temp = this.head;
            const unique = new Set();
            unique.add(temp.value);

            while(temp.next) {
                if(unique.has(temp.next.value)) {
                    temp.next = temp.next.next;
                } else {
                    unique.add(temp.next.value);
                }
                if (temp.next === null) {
                    break;
                } else {
				    temp = temp.next;
                }
			}
        }
	}
}

const linkedList = new LinkedList();
