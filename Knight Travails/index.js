class Queue {
    constructor() {
        this.items = []
    }
    enqueue(obj) {
        this.items.push(obj);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

function knightTravails(source, destination) {
    // bfsInfo will be used to store which place have been visited before
    const bfsInfo = [];
    // Adds bfsInfo
    for(let i = 0; i < chessBoard.length; i++) {
        const currRow = chessBoard[i];
        const row = [];
        currRow.map((node) => row.push({moves: null, predecessor: null}))
        bfsInfo.push(row)
    }
    // Queue
    const queue = new Queue();
    queue.enqueue(source);
    bfsInfo[source[0]][source[1]].moves = 0;

    // Breadth First Search
    while (!queue.isEmpty()) {
        const currNode = queue.dequeue();
        const currY = currNode[0];
        const currX = currNode[1];
        if(currY === destination[0] && currX === destination[1]) {
            return giveResult(destination, bfsInfo);
        }
        const nextMoves = createNextMoves(currNode);
        nextMoves.map(move => {
            if(bfsInfo[move[0]][move[1]].moves === null) {
                bfsInfo[move[0]][move[1]].moves = bfsInfo[currY][currX].moves + 1;
                bfsInfo[move[0]][move[1]].predecessor = currNode;
                queue.enqueue(move);
            }
        })

    }
}

const chessBoard = [
    [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],
    [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
    [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7]],
    [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]],
    [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7]],
    [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7]],
    [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
    [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
];

function createNextMoves(source) {
    const srcX = source[1];
    const srcY = source[0];
    const moves = []
    if (srcY - 2 >= 0 && srcX + 1 <= 7) moves.push([srcY - 2, srcX + 1])
    if (srcY - 1 >= 0 && srcX + 2 <= 7) moves.push([srcY - 1, srcX + 2])
    if (srcY + 1 <= 7 && srcX + 2 <= 7) moves.push([srcY + 1, srcX + 2])
    if (srcY + 2 <= 7 && srcX + 1 <= 7) moves.push([srcY + 2, srcX + 1])
    if (srcY + 2 <= 7 && srcX - 1 >= 0) moves.push([srcY + 2, srcX - 1])
    if (srcY + 1 <= 7 && srcX - 2 >= 0) moves.push([srcY + 1, srcX - 2])
    if (srcY - 1 >= 0 && srcX - 2 >= 0) moves.push([srcY - 1, srcX - 2])
    if (srcY - 2 >= 0 && srcX - 1 >= 0) moves.push([srcY - 2, srcX - 1])
    return moves;
}

function giveResult(destination, bfsInfo) {
    let backTrack = `[${destination}]`;
    const queue = new Queue();
    queue.enqueue(destination)
    while(queue.isEmpty() === false) {
        const currNode = queue.dequeue();
        const node = bfsInfo[currNode[0]][currNode[1]];
        if(node.predecessor === null) {
            return `You made it in ${bfsInfo[destination[0]][destination[1]].moves} moves! Here is your path: ` + backTrack;
        }
        backTrack = `[${node.predecessor}] -> ` + backTrack;
        queue.enqueue(node.predecessor);
    }

}

const example = knightTravails([3,3],[4,3]);
console.log(example);