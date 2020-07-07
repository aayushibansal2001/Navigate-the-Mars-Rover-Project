

//funtion to perform Breadth-first search
//It takes 1 boolean argument to specify whether diagonal movement is allowed or not
function bfs(diagonal){

	var queue = new Queue(); 
    console.log("Starting bfs");
    //getting direction vectors as per the allowed movement
	let dir = setDirection(diagonal);
	//creating a "visited" array to keep track of the visited nodes
	let vis = new Array(totalCols*totalRows);

	//adding the start cell to the queue
	queue.enqueue(startCell);
	
	cellsToAnimate.push([startCell, "searching"]);

    while(!queue.isEmpty()){
		
		//dequeue/remove a node from queue
		let removedNode = queue.dequeue();
		
		//if the removed node is the end cell
        if(removedNode[0]==endCell[0] && removedNode[1]==endCell[1]){
			console.log("end cell found");
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
                 }
        }
	}

	//to find show the final shortest path. 
	//this functionality needs to be aaded
	if (pathFound) {
		var r = endCell[0];
		var c = endCell[1];
		cellsToAnimate.push( [[r, c], "success"] );
		// while (prev[r][c] != null){
		// 	var prevCell = prev[r][c];
		// 	r = prevCell[0];
		// 	c = prevCell[1];
		// 	cellsToAnimate.push( [[r, c], "success"] );
		// }
	}
	return pathFound;
}