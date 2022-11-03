class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {

    static buildTree(arr, start, end) {
        if (start > end) {
            return null;
        }
        const mid = parseInt((start + end) / 2);
        const rootNode = new Node(arr[mid]);
        rootNode.left = this.buildTree(arr, start, mid - 1);
        rootNode.right = this.buildTree(arr, mid + 1, end);

        return rootNode;
    }

    constructor(array) {
        this.root = Tree.buildTree(array, 0, array.length - 1);
    }

    insert(value, node = this.root) {
        if (this.find(value) !== false) {
            throw new Error('Node Already Exist');
        } else {
            if (node.left === null && value < node.data) {
                node.left = new Node(value);
                return node;
            };
            if (node.right === null && value > node.data) {
                node.right = new Node(value);
                return node;
            }
            if (value < node.data) {
                return this.insert(value, node.left);
            } else {
                return this.insert(value, node.right);
            }
        }
    }

    delete(value, node = this.root) {
        if (node == null) return node;
        if (value < node.data) {
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {
            node.right = this.delete(value, node.right);
        }
        else {
            // node with only one child or no child
            if (node.left == null) return node.right;
            else if (node.right == null) return node.left;

            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            node.data = this.minValue(node.right);
            node.right = this.delete(node.data, node.right);
        }
        return node;
    }

    minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    find(value, node = this.root) {
        if (node.data === value) return node;
        if (node.left === null && node.right === null) return false;
        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        };
    }

    levelOrder(node = this.root, func) {
        const queue = [];
        queue.push(node);
        const values = [];
        while (queue.length !== 0) {
            let currNode = queue.shift();
            if (func) {
                func(currNode.data);
            } else {
                values.push(currNode.data);
            };
            if (currNode.left !== null) queue.push(currNode.left)
            if (currNode.right !== null) queue.push(currNode.right);
        }
        return values;
    }
    // Pre-order Traversal === <root><left><right>
    preOrder(node = this.root, func, result = []) {
        if (node === null) return;
        if (func) {
            func(node.data);
        } else {
            result.push(node.data);
        }
        this.preOrder(node.left, func, result);
        this.preOrder(node.right, func, result);
        return result;
    }
    // In-order Traversal === <left><root><right>
    inOrder(node = this.root, func, result = []) {
        if (node === null) return;
        this.inOrder(node.left, func, result);
        if (func) {
            func(node.data)
        } else {
            result.push(node.data);
        }
        this.inOrder(node.right, func, result);
        return result;
    }
    // Post-order Traversal === <left><right><root>
    postOrder(node = this.root, func, result = []) {
        if (node === null) return;
        this.inOrder(node.left, func, result);
        this.inOrder(node.right, func, result);
        if (func) {
            func(node.data)
        } else {
            result.push(node.data);
        }
        return result;
    }
    /*
        The depth of a node is the number of edges 
        present in path from the root node of a tree to that node.
    */
    depth(node, currNode = this.root, edges = 0) {
        // Base Case
        if (currNode.data === node) return edges;
        // Not Found Case
        if (currNode === null) return null;
        // If Node is on left side
        if (node < currNode.data) {
            return this.depth(node, currNode.left, edges + 1);
        }
        // If node is on right side
        if (node > currNode.data) {
            return this.depth(node, currNode.right, edges + 1);
        }
    }
    /*
        The height of a node is the number of edges 
        present in the longest path connecting that node to a leaf node.
    */
    height(node, edges = 0) {
        // Base Case
        if (node === null) return edges - 1;
        // Recursion
        const leftHeight = this.height(node.left, edges + 1);
        const rightHeight = this.height(node.right, edges + 1);
        // Finding the Longest One
        const maxHeight = Math.max(leftHeight, rightHeight);
        return maxHeight;
    }

    isBalanced() {
        const leftHeight = this.height(this.root.left);
        const rightHeight = this.height(this.root.right);
        if (Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight) > 1) {
            return false;
        } else {
            return true;
        }
    }

    reBalance() {
        if(this.isBalanced()) return;
        const sortedArray = this.inOrder();
        this.root = Tree.buildTree(sortedArray, 0, sortedArray.length - 1);
        return;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}


function mergeSort(arr) {
    if (arr.length === 1) return arr;

    let firstHalf = arr.slice(0, Math.floor(arr.length / 2));
    let secondHalf = arr.slice(Math.floor(arr.length / 2));

    firstHalf = mergeSort(firstHalf);
    secondHalf = mergeSort(secondHalf);

    return merge(firstHalf, secondHalf);
}

function merge(firstHalf, secondHalf) {

    const sortedArray = [];

    let fIndex = 0;
    let sIndex = 0;

    while (fIndex < firstHalf.length && sIndex < secondHalf.length) {
        if (firstHalf[fIndex] < secondHalf[sIndex]) {
            sortedArray.push(firstHalf[fIndex]);
            fIndex++;
        } else {
            sortedArray.push(secondHalf[sIndex]);
            sIndex++;
        }
    }

    while (fIndex < firstHalf.length) {
        sortedArray.push(firstHalf[fIndex]);
        fIndex++;
    }

    while (sIndex < secondHalf.length) {
        sortedArray.push(secondHalf[sIndex]);
        sIndex++;
    }

    return removeDuplicates(sortedArray);
}

function removeDuplicates(arr) {
    return arr.filter((value, index) => value !== arr[index + 1]);
}
