function minHeap() {
    this.heap = [];
    this.isEmpty = function() {
        return (this.heap.length == 0);
    }
    this.clear = function() {
        this.heap = [];
        return;
    }
    this.getMin = function() {
        if (this.isEmpty()) {
            return null;
        }
        var min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap[this.heap.length - 1] = min;
        this.heap.pop();
        if (!this.isEmpty()) {
            this.siftDown(0);
        }
        return min;
    }
    this.push = function(item) {
        this.heap.push(item);
        this.siftUp(this.heap.length - 1);
        return;
    }
    this.parent = function(index) {
        if (index == 0) {
            return null;
        }
        return Math.floor((index - 1) / 2);
    }
    this.children = function(index) {
        return [(index * 2) + 1, (index * 2) + 2];
    }
    this.siftDown = function(index) {
        var children = this.children(index);
        var leftChildValid = (children[0] <= (this.heap.length - 1));
        var rightChildValid = (children[1] <= (this.heap.length - 1));
        var newIndex = index;
        if (leftChildValid && this.heap[newIndex][0] > this.heap[children[0]][0]) {
            newIndex = children[0];
        }
        if (rightChildValid && this.heap[newIndex][0] > this.heap[children[1]][0]) {
            newIndex = children[1];
        }
        // No sifting down needed
        if (newIndex === index) { return; }
        var val = this.heap[index];
        this.heap[index] = this.heap[newIndex];
        this.heap[newIndex] = val;
        this.siftDown(newIndex);
        return;
    }
    this.siftUp = function(index) {
        var parent = this.parent(index);
        if (parent !== null && this.heap[index][0] < this.heap[parent][0]) {
            var val = this.heap[index];
            this.heap[index] = this.heap[parent];
            this.heap[parent] = val;
            this.siftUp(parent);
        }
        return;
    }
}

//************************************ 

function dijkstra() {
    var pathFound = false;
    var myHeap = new minHeap();
    var prev = createPrev();
    var distances = createDistances();
    var visited = createVisited();
    distances[source[0]][source[1]] = 0;
    myHeap.push([0, [source[0], source[1]]]);
    cellsToAnimate.push([
        [source[0], source[1]], "searching"
    ]);
    while (!myHeap.isEmpty()) {
        var cell = myHeap.getMin();
        //console.log("Min was just popped from the heap! Heap is now: " + JSON.stringify(myHeap.heap));
        var i = cell[1][0];
        var j = cell[1][1];
        if (visited[i][j]) { continue; }
        visited[i][j] = true;
        cellsToAnimate.push([
            [i, j], "visited"
        ]);
        if ((i == destination[0] && j == destination[1]) || (i == destination1[0] && j == destination1[1])) {

            if ((i == destination[0] && j == destination[1])) {
                whichEndDij = 0;
                pathFound = true;
            } else if ((i == destination1[0] && j == destination1[1])) {
                whichEndDij = 1;
                pathFound = true;
            }


            break;
        }
        var neighbors = getNeighbors(i, j);
        for (var k = 0; k < neighbors.length; k++) {
            var m = neighbors[k][0];
            var n = neighbors[k][1];
            if (visited[m][n]) { continue; }
            var newDistance = distances[i][j] + 1;
            if (newDistance < distances[m][n]) {
                distances[m][n] = newDistance;
                prev[m][n] = [i, j];
                myHeap.push([newDistance, [m, n]]);
                //console.log("New cell was added to the heap! It has distance = " + newDistance + ". Heap = " + JSON.stringify(myHeap.heap));
                cellsToAnimate.push([
                    [m, n], "searching"
                ]);
            }
        }
        //console.log("Cell [" + i + ", " + j + "] was just evaluated! myHeap is now: " + JSON.stringify(myHeap.heap));
    }




    if (pathFound) {


        if (whichEndDij == 0) {
            var i = destination[0];
            var j = destination[1];
            cellsToAnimate.push([destination, "success"]);
            while (prev[i][j] != null) {
                var prevCell = prev[i][j];
                i = prevCell[0];
                j = prevCell[1];
                cellsToAnimate.push([
                    [i, j], "success"
                ]);
            }
        } else if (whichEndDij == 1) {

            var i = destination1[0];
            var j = destination1[1];
            cellsToAnimate.push([destination1, "success"]);
            while (prev[i][j] != null) {
                var prevCell = prev[i][j];
                i = prevCell[0];
                j = prevCell[1];
                cellsToAnimate.push([
                    [i, j], "success"
                ]);
            }

        }







    }





    return pathFound;




}