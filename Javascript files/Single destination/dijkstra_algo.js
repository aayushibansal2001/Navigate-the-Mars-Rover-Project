
function dijkstra(diagonal){
    let dir = setDirection(diagonal);
    //creating a "visited" array to keep track of the visited nodes
	let vis = new Array(maxCols*maxRows);

	//Adding a true value corresponding to cells that are walls
	vis = addWalls(vis, diagonal);
	
    let dist = new Array(maxCols*maxRows);
    dist = setAllToInfinite(dist);
	dist[mapping1D(source[0], source[1], maxCols)] = 0;
	
	let pathfound = false;
	
	let prevArr = prevCellArray()

	let pq = new PriorityQueue();
	let idx = mapping1D(source[0], source[1], maxCols);
	pq.enqueue(idx,0);
	console.log("animation starting");
    cellsToAnimate.push( [source, "searching"] );
    
    while(!pq.isEmpty()){
		console.log(" inside pq");

		let removeNode = pq.dequeue();
        let removeCell = mapping2D(removeNode.index, maxCols);
        if(!$($("#tableHolder").find("td")[removeNode.index]).hasClass("hill") && !$($("#tableHolder").find("td")[removeNode.index]).hasClass("crater")
         && !$($("#tableHolder").find("td")[removeNode.index]).hasClass("ice") && !$($("#tableHolder").find("td")[removeNode.index]).hasClass("storm"))
        cellsToAnimate.push( [[removeCell[0], removeCell[1]], "visited"] );
        console.log(removeNode.index);
		
        if(removeCell[0] == destination[0] && removeCell[1] == destination[1]){
            pathfound=true;
            break;
        }

        for(let i=0; i<dir.length; i++){
            let x = removeCell[0] + dir[i][0];
			let y = removeCell[1] + dir[i][1];
			let new_index = mapping1D(x, y, maxCols);
			console.log(x+", "+y +" => "+ vis[mapping1D(x, y, maxCols)]);
			
            if(x>=0 && y>=0 && x<maxRows && y<maxCols && !vis[mapping1D(x, y, maxCols)]){
                if($($("#tableHolder").find("td")[mapping1D(x,y,maxCols)]).hasClass("hill")){
                    dist[new_index] = dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+10
                    pq.enqueue(new_index, dist[new_index]);
                    prevArr[x][y] = [removeCell[0], removeCell[1]];
                }
                if($($("#tableHolder").find("td")[mapping1D(x,y,maxCols)]).hasClass("crater")){
                    dist[new_index] = dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+7
                    pq.enqueue(new_index, dist[new_index]);
                    prevArr[x][y] = [removeCell[0], removeCell[1]];
                }
                if($($("#tableHolder").find("td")[mapping1D(x,y,maxCols)]).hasClass("ice")){
                    dist[new_index] = dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+4
                    pq.enqueue(new_index, dist[new_index]);
                    prevArr[x][y] = [removeCell[0], removeCell[1]];
                }
                if($($("#tableHolder").find("td")[mapping1D(x,y,maxCols)]).hasClass("storm")){
                    dist[new_index] = dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+15
                    pq.enqueue(new_index, dist[new_index]);
                    prevArr[x][y] = [removeCell[0], removeCell[1]];
                }

                if(dist[new_index]==5000){
                    dist[new_index] = dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+1
                    pq.enqueue(new_index, dist[new_index]);
                    console.log("Adding neibours");
                    cellsToAnimate.push( [[x, y], "searching"] );
                    prevArr[x][y] = [removeCell[0], removeCell[1]];
                }
                else{
                    dist[new_index] = Math.min(dist[new_index], dist[mapping1D(removeCell[0], removeCell[1], maxCols)]+1);
                    console.log("Updating distance");
                }
                
            }
        }
        console.log("vis => "+removeNode.index);
        vis[removeNode.index] = true;
    }

    if (pathfound) {
		var i = destination[0];
		var j = destination[1];
		cellsToAnimate.push( [destination, "success"] );
		while (prevArr[i][j] != null){
			var prevCell = prevArr[i][j];
			i = prevCell[0];
			j = prevCell[1];
			cellsToAnimate.push( [[i, j], "success"] );
		}
	}
	return pathfound;
    //in progress
}


function setAllToInfinite(dist){
    for(let i=0; i<dist.length; i++){
        dist[i] = 5000;
	}
	return dist;
}


// class to define the type of elements 
class PNode { 
    constructor(index, distance) 
    { 
        //"index" stores the index of the node, through which we can access it's value 
        this.index = index; 
        //"distance" stores the distance of each node from the source node (start cell)
        this.distance = distance; 
    } 
}

//class to define priority queue
class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() { 
        this.items = []; 
    } 
  
    enqueue(index, distance){ 
    // create a new PNode type object, ie,
    // a node for priority queue that contains index and distance from source
    // priority is defined by "distace"
    // lesser the distance, higher the priority
    var pNode = new PNode(index, distance); 
    var contain = false; 
  
    
    for (var i = 0; i < this.items.length; i++) { 
        if (this.items[i].distance > pNode.distance) { 
            // Once the correct location is found it is 
            // enqueued 
            this.items.splice(i, 0, pNode); 
            contain = true; 
            break; 
        } 
    } 
  
    	// if the element have the highest priority 
    	// it is added at the end of the queue 
   		if (!contain) { 
        	this.items.push(pNode); 
    	} 
	}

	dequeue(){ 
    	// return the dequeued element and remove it. 
    	// if the queue is empty returns Underflow 
    	if (this.isEmpty()) 
	        return "Underflow"; 
	    return this.items.shift(); 
	}

	isEmpty(){ 
	    // return true if the queue is empty. 
    	return this.items.length == 0; 
    }
    
    

}