export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];
    private currentIndex: number;

    constructor(private capacity: number = Infinity) {
        this.currentIndex = -1;//empty
    }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.currentIndex += 1;
        this.storage.push(item);
    }

    pop(): T | undefined {
        //giu lai phan tu root path
        if(this.storage.length !== 1){
            this.storage.pop();
            return this.storage[--this.currentIndex];
        }
        return undefined;      
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}