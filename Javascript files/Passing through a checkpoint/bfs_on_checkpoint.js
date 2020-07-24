/*variables used- source, destination, totalCols, totalRows, pathFound
fuctions used- cellsToAnimate(), addWalls(), prevCellArray(), setDirection(), mapping1D(), Queue class*/
//funtion to perform Breadth-first search
//It takes 1 boolean argument to specify whether diagonal movement is allowed or not


function bfsFromStoC(diagonal) {

    var queue = new Queue();
    console.log("Starting bfs");
    //getting direction vectors as per the allowed movement
    let dir = setDirection(diagonal);
    //creating a "visited" array to keep track of the visited nodes
    let vis = new Array(maxCols * maxRows);
    //Adding a true value corresponding to cells that are walls
    vis = addWalls(vis, diagonal);
    console.log("walls added");
    //creating an array for storing prev cell index of the current cell
    let prevArr = prevCellArray();

    //adding the start cell to the queue
    queue.enqueue(source);
    //animating the start cell
    cellsToAnimate.push([source, "searching"]);

    while (!queue.isEmpty()) {

        //dequeue/remove a node from queue
        let removedNode = queue.dequeue();

        //if the removed node is the end cell
        if (removedNode[0] == checkpoint1[0] && removedNode[1] == checkpoint1[1]) {
            console.log("checkpoint1 found");
            // prevArr[removedNode[0]][removedNode[1]] = removedNode;
            pathFound = true;
            break;
        }

        //animating the start cell as visited
        cellsToAnimate.push([removedNode, "visited"]);

        //iterate through the direction array to obtain the neighbouring cells along the given dirction vectors
        for (let i = 0; i < dir.length; i++) {

            //condition to check that neighbouring lie within the range of the grid and are unvisited
            //row value should be greater than 0 and less than or equal to max row value
            //column value should be greater than 0 and less than or equal to max column value
            //ans that cell should be unvisited previously
            if (removedNode[0] + dir[i][0] >= 0 && removedNode[0] + dir[i][0] < maxRows &&
                removedNode[1] + dir[i][1] >= 0 && removedNode[1] + dir[i][1] < maxCols &&
                vis[mapping1D(removedNode[0] + dir[i][0], removedNode[1] + dir[i][1], maxCols)] != true) {

                //add the neiboring cell to the queue and mark it visited
                //animate the cell
                //store that value of removeNode as its previous cell value
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
    //the prev of source cell is null
    // we keep on finding the previous cells starting from cell cell,
    // until we reach source cell, which has null as its previous cell
    // the path found will be the shortest path, and is animated
    if (pathFound) {
        prevArr[source[0]][source[1]] = null;
        let r = checkpoint1[0];
        let c = checkpoint1[1];
        cellsToAnimate.push([checkpoint1, "success"]);
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

function bfsFromCtoD(diagonal) {

    var queue = new Queue();
    console.log("Starting bfs");
    //getting direction vectors as per the allowed movement
    let dir = setDirection(diagonal);
    //creating a "visited" array to keep track of the visited nodes
    let vis = new Array(maxCols * maxRows);
    //Adding a true value corresponding to cells that are walls
    vis = addWalls(vis, diagonal);
    console.log("walls added");
    //creating an array for storing prev cell index of the current cell
    let prevArr = prevCellArray();

    //adding the start cell to the queue
    queue.enqueue(checkpoint1);
    //animating the start cell
    cellsToAnimate.push([checkpoint1, "searching"]);

    while (!queue.isEmpty()) {

        //dequeue/remove a node from queue
        let removedNode = queue.dequeue();

        //if the removed node is the end cell
        if (removedNode[0] == destination[0] && removedNode[1] == destination[1]) {
            console.log("destination found");
            // prevArr[removedNode[0]][removedNode[1]] = removedNode;
            pathFound = true;
            break;
        }

        //animating the start cell as visited
            cellsToAnimate.push([removedNode, "visited"]);

        //iterate through the direction array to obtain the neighbouring cells along the given dirction vectors
        for (let i = 0; i < dir.length; i++) {
            let x = removedNode[0] + dir[i][0];
            let y = removedNode[1] + dir[i][1];

            //condition to check that neighbouring lie within the range of the grid and are unvisited
            //row value should be greater than 0 and less than or equal to max row value
            //column value should be greater than 0 and less than or equal to max column value
            //ans that cell should be unvisited previously
            if (x >= 0 && x< maxRows && y >= 0 && y < maxCols &&
                vis[mapping1D(x, y, maxCols)] != true) {

                //add the neiboring cell to the queue and mark it visited
                //animate the cell
                //store that value of removeNode as its previous cell value
                queue.enqueue([x, y]);
                vis[mapping1D(x, y, maxCols)] = true;

                if(! $($("#tableHolder").find("td")[mapping1D(x, y, maxCols)]).hasClass("success"))
                cellsToAnimate.push([[x, y], "searching"]);
                prevArr[x][y] = removedNode;
            }
        }
    }

    //to find show the final shortest path. 
    //the prev of source cell is null
    // we keep on finding the previous cells starting from cell cell,
    // until we reach source cell, which has null as its previous cell
    // the path found will be the shortest path, and is animated
    if (pathFound) {
        prevArr[checkpoint1[0]][checkpoint1[1]] = null;
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

// updating visited array, to maks walls as visited
// it also prevents diagonal movement allowed algo from jumping through walls
function addWalls(vis, diagonal) {
    for (let i = 0; i < vis.length; i++) {
        {
            // console.log(" haha, lol");
            // to check that the paricular cell is not a wall
            if ($($("#tableHolder").find("td")[i]).hasClass("wall")) {
                { //if its cell marking it as true
                    vis[i] = true;
                    // console.log("reached wall adding pt");
                }
            }
            
            if ($($("#tableHolder").find("td")[i]).hasClass("visited")) {
                { //if its cell marking it as true
                    vis[i] = true;
                    console.log("reached wall adding pt");
                }
            }
            

            //to check the alorithm doesnt pass diagonally though walls
            if (diagonal) {
                checkDiagonalWalls(i, vis);
            }

        }
    }
    return vis;
}

//if 2 neibouring cells are walls, then cant jump to the diagonal between them
function checkDiagonalWalls(i, vis) {
    let cell = mapping2D(i, maxCols)
    let r = cell[0]
    let c = cell[1]
        // checks row column value will be within range
        //if down and right are walls, then we cant go to down-right
    if (r + 1 < maxRows && c + 1 < maxCols && $($("#tableHolder").find("td")[mapping1D(r + 1, c, maxCols)]).hasClass("wall") &&
        $($("#tableHolder").find("td")[mapping1D(r, c + 1, maxCols)]).hasClass("wall"))
        vis[mapping1D(r + 1, c + 1, maxCols)] = true;

    //if up and right are walls, then we cant pass through it to reach up-right cell
    if (r - 1 > 0 && c + 1 < maxCols && $($("#tableHolder").find("td")[mapping1D(r - 1, c, maxCols)]).hasClass("wall") &&
        $($("#tableHolder").find("td")[mapping1D(r, c + 1, maxCols)]).hasClass("wall"))
        vis[mapping1D(r - 1, c + 1, maxCols)] = true;
    //
    if (r + 1 < maxRows && c - 1 > 0 && $($("#tableHolder").find("td")[mapping1D(r + 1, c, maxCols)]).hasClass("wall") &&
        $($("#tableHolder").find("td")[mapping1D(r, c - 1, maxCols)]).hasClass("wall"))
        vis[mapping1D(r + 1, c - 1, maxCols)] = true;

    if (r - 1 > 0 && c - 1 > 0 && $($("#tableHolder").find("td")[mapping1D(r - 1, c, maxCols)]).hasClass("wall") &&
        $($("#tableHolder").find("td")[mapping1D(r, c - 1, maxCols)]).hasClass("wall"))
        vis[mapping1D(r - 1, c - 1, maxCols)] = true;

}