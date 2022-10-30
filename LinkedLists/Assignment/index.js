class Node {
    constructor (value = null, nextNode = null) {
        this.value = value;
        this.next = nextNode;
    }
}

class LinkedList {
    append(value, obj = this) {
        if (Object.keys(this).length === 0) {
            const newNode  = new Node(value);
            this.value = newNode.value;
            this.next = newNode.next;
            return;
        }

        if(obj.next == null) {
            obj.next = new Node (value);
        } else {
            return this.append(value, obj.next);
        }
    }

    prepend(value) {
        const newNode = new Node (value);
        newNode.next = {...this};
        this.value = newNode.value;
        this.next = newNode.next;
    }

    size(obj = this ,total = 1) {
        if(obj.next === null) {
            return total;
        }
        return this.size(obj.next, total + 1);
    }

    head() {
        return {value: this.value, next: this.next}
    }

    at(index, currIndex = 0, obj = this) {
        if (index > this.size() - 1) {
            return 'Sorry! index exceeded the length of list.';
        }
        if(currIndex === index) {
            return obj;
        }
        return this.at(index, currIndex + 1, obj.next);
    }

    pop(obj = this) {
        if (this.value == null) {
            throw new Error('List is empty');
        }
        if (this.value !== null && this.next == null) {
            this.value = null;
            return;
        }

        if (obj.next.next == null) {
            obj.next = null;
            return;
        }

        return this.pop(obj.next);
    }

    contains(value, obj = this) {
        if (obj.value === value) {
            return true;
        }
        if (obj.next === null) {
            return false;
        }
        return this.contains(value, obj.next)
    }

    find(value, obj = this, index =  0) {
        if (value === obj.value) {
            return index;
        }
        if(obj.next === null) {
            return null;
        }
        return this.find(value, obj.next, index + 1)
    }

    toString (obj = this, str = ``) {
        if (Object.keys(this).length === 0) {
            return `null`
        }
        if (obj.next === null) {
            return str.concat(`(${obj.value}) -> null`);
        }
        return this.toString(obj.next, str.concat(`(${obj.value}) -> `))
    }

    insertAt(value, index) {
        const newNode = new Node(value);
        newNode.next = this.at(index + 1);
        this.at(index).next = newNode;
        return newNode;
    }

    removeAt(index) {
        const removedNode = this.at(index);
        this.at(index - 1).next = this.at(index + 1);
        return removedNode;
    }
}

const linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
linkedList.append(6);
linkedList.append(7);
linkedList.append(8);
linkedList.append(9);
linkedList.prepend(0);