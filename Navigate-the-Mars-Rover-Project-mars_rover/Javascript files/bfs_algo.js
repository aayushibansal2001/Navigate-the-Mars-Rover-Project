//A class for creating queue
class Queue {
    constructor() {
        this.nodes = [];
    }

    //function to add a node to the queue
    enqueue(value) {
        this.nodes.push(value);
    }

    //function to delete a node from the queue
    dequeue() {
        if (this.isEmpty())
            return "Empty";
        else
            return this.nodes.shift();
    }

    //function to check if the queue is empty
    isEmpty() {
        return this.nodes.length == 0;
    }

    //function to print the contents of the queue
    printQueue() {
        var str = "";
        for (var i = 0; i < this.nodes.length; i++)
            str += this.nodes[i] + " ";
        return str;
    }

}

//************************************ 

//funtion to perform Breadth-first search
//It takes 1 boolean argument to specify whether diagonal movement is allowed or not
function bfs(diagonal) {

    var queue = new Queue();
    console.log("Starting bfs");
    //getting direction vectors as per the allowed movement
    let dir = setDirection(diagonal);
    //creating a "visited" array to keep track of the visited nodes
    let vis = new Array(maxCols * maxRows);
    //creating an array for storing prev cell index
    let prevArr = prevCellArray();

    //adding the start cell to the queue
    queue.enqueue(source);

    cellsToAnimate.push([source, "searching"]);

    while (!queue.isEmpty()) {

        //dequeue/remove a node from queue
        let removedNode = queue.dequeue();

        //if the removed node is the end cell
        if (removedNode[0] == destination[0] && removedNode[1] == destination[1]) {
            console.log("end cell found");
            // prevArr[removedNode[0]][removedNode[1]] = removedNode;
            pathFound = true;
            break;
        }

        cellsToAnimate.push([removedNode, "visited"]);

        //iterate through the direction array to obtain the neighbouring cells along the given dirction vectors
        for (let i = 0; i < dir.length; i++) {

            //condition to check that neighbouring lie within the range of the grid and are unvisited
            if (removedNode[0] + dir[i][0] >= 0 && removedNode[0] + dir[i][0] < maxRows &&
                removedNode[1] + dir[i][1] >= 0 && removedNode[1] + dir[i][1] < maxCols &&
                vis[mapping1D(removedNode[0] + dir[i][0], removedNode[1] + dir[i][1], maxCols)] != true) {
                //add the node to the queue and mark it visited
                queue.enqueue([removedNode[0] + dir[i][0], removedNode[1] + dir[i][1]]);
                vis[mapping1D(removedNode[0] + dir[i][0], removedNode[1] + dir[i][1], maxCols)] = true;
                cellsToAnimate.push([
                    [removedNode[0] + dir[i][0], removedNode[1] + dir[i][1]], "searching"
                ]);
                prevArr[removedNode[0] + dir[i][0]][removedNode[1] + dir[i][1]] = removedNode;
            }
        }
    }

    //to find show the final shortest path. 
    //this functionality needs to be aaded
    if (pathFound) {
        prevArr[source[0]][source[1]] = null;
        let r = destination[0];
        let c = destination[1];
        cellsToAnimate.push([destination, "success"]);
        console.log("yes1");
        while (prevArr[r][c] != null) {
            let prevCell = prevArr[r][c];
            r = prevCell[0];
            c = prevCell[1];
            console.log("yes2");
            cellsToAnimate.push([
                [r, c], "success"
            ]);
        }
        console.log("yes_final");
    }
    return pathFound;
}



// this creates a 2D array equal to the size of our grid
// each element of the array will store the previous node of that element, as per any given algorithm
// i.e, store [row, column] of the cell from which the current cell was reached
function prevCellArray() {
    //creating the previous array
    let prevArray = new Array();
    for (let i = 0; i < maxRows; i++) {
        //creating an array for 1 row
        let prevRows = [];
        for (let j = 0; j < maxCols; j++) {
            //adding null for each column in the prevRow
            prevRows.push(null);
        }
        // the row containing null for each column, is added to prevArray
        prevArray.push(prevRows);
    }
    return prevArray;
}

//returns an array containing the directions along which movement is allowed, 
//depending on whether diagonal movement is allowd or not
function setDirection(diagonal) {

    if (!diagonal)
    //direction vectors for no diagonal movement (right, down, left, up; in order)
        return [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];
    else
    //directions - right, down, left, up, right-down, right-up, left-up, left-down in order
        return [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1]
    ];

}


//funtion to obtain index value in 1D array from row and column
//or mapping 2D array to 1D array
function mapping1D(row, column, totalColumn) {
    return (row * totalColumn) + column;
}

//function to obtain row and coulmn value from 1D array index value
//or mapping 1D array to 2D
function mapping2D(index, totalColumn) {
    var position = [index / totalColumn, index % totalColumn];
    return position
}