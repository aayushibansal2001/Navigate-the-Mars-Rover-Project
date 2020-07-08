
//funtion to perform Breadth-first search
//It takes 1 boolean argument to specify whether diagonal movement is allowed or not
function bfs(diagonal){

	var queue = new Queue(); 
    console.log("Starting bfs");
    //getting direction vectors as per the allowed movement
	let dir = setDirection(diagonal);
	//creating a "visited" array to keep track of the visited nodes
    let vis = new Array(totalCols*totalRows);
    //creating an array for storing prev cell index
    let prevArr = prevCellArray();

	//adding the start cell to the queue
	queue.enqueue(startCell);
	
	cellsToAnimate.push([startCell, "searching"]);

    while(!queue.isEmpty()){
		
		//dequeue/remove a node from queue
		let removedNode = queue.dequeue();
		
		//if the removed node is the end cell
        if(removedNode[0]==endCell[0] && removedNode[1]==endCell[1]){
			console.log("end cell found");
			// prevArr[removedNode[0]][removedNode[1]] = removedNode;
			pathFound=true;
            break;
		}

		cellsToAnimate.push( [removedNode, "visited"] );

		//iterate through the direction array to obtain the neighbouring cells along the given dirction vectors
        for(let i=0; i<dir.length; i++){
			
			//condition to check that neighbouring lie within the range of the grid and are unvisited
            if(removedNode[0] + dir[i][0]>=0 && removedNode[0] + dir[i][0]<totalRows
                && removedNode[1] + dir[i][1]>=0 && removedNode[1] + dir[i][1]<totalCols
                && vis[mapping1D(removedNode[0] + dir[i][0], removedNode[1] + dir[i][1], totalCols)] != true)
                 {
					//add the node to the queue and mark it visited
                    queue.enqueue([removedNode[0] + dir[i][0], removedNode[1] + dir[i][1]]);
					vis[mapping1D(removedNode[0] + dir[i][0], removedNode[1] + dir[i][1], totalCols)] = true;
                    cellsToAnimate.push( [[removedNode[0] + dir[i][0], removedNode[1] + dir[i][1]], "searching"] );
                    prevArr[removedNode[0] + dir[i][0]][removedNode[1] + dir[i][1]] = removedNode;
                 }
        }
	}

	//to find show the final shortest path. 
	//this functionality needs to be aaded
	if (pathFound) {
		prevArr[startCell[0]][startCell[1]] = null;
		let r = endCell[0];
		let c = endCell[1];
		cellsToAnimate.push( [endCell, "success"] );
		console.log("yes1");
		while (prevArr[r][c] != null){
			let prevCell = prevArr[r][c];
			r = prevCell[0];
			c = prevCell[1];
			console.log("yes2");
			cellsToAnimate.push( [[r, c], "success"] );
		}
		console.log("yes_final");
	}
	return pathFound;
}
