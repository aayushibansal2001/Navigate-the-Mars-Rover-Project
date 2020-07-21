/*variables used- source, destination, totalCols, totalRows, pathFound
fuctions used- cellsToAnimate(), addWalls(), prevCellArray(), setDirection(), mapping1D(), Queue class*/
//funtion to perform Breadth-first search
//It takes 1 boolean argument to specify whether diagonal movement is allowed or not





function bfs(diagonal) {

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
        if (removedNode[0] == destination[0] && removedNode[1] == destination[1]) {
            console.log("end cell found");
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

