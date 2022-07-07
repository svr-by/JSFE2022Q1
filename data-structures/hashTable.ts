// Read about hash tables and its working mechanism and implement it functionality.
// NOTE: get acquainted with possible collisions when working with hash tables, take this information into account when implementing.

type DataCell<T> = [key: string, value: T];

class HashTable<T> {
  size: number;
  private _storage: DataCell<T>[][];

  constructor(hashSize: number) {
    this.size = hashSize;
    this._storage = [];
  }

  // add value to hash table
  add(key: string, value: T) {
    let index = this._hash(key);

    if (this._storage[index]) {
      for (let i = 0; i < this._storage[index].length; i++) {
        if (this._storage[index][i][0] === key) {
          this._storage[index][i][1] = value;
          return;
        }
        this._storage[index].push([key, value]);
      }
    } else {
      this._storage[index] = [];
      this._storage[index].push([key, value]);
    }
  }

  // remove value from hash table
  remove(key: string) {
    let index = this._hash(key);

    if (this._storage[index] && this._storage[index].length) {
      for (let i = 0; i < this._storage[index].length; i++) {
        if (this._storage[index][i][0] === key) {
          return this._storage[index].splice(i, 1);
        }
      }
    }
    return;
  }

  // get value from hash table
  find(key: string) {
    let index = this._hash(key);

    if (this._storage[index]) {
      for (let i = 0; i < this._storage[index].length; i++) {
        if (this._storage[index][i][0] === key) {
          return this._storage[index][i][1];
        }
      }
    }
    return;
  }

  // hash
  private _hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt(0);
    }
    return hash % this.size;

  }
}

const hashTable = new HashTable<number>(10);