var maxRows = 15; //It denotes the total number of rows
var maxCols = 35; //It denotes the total number of columns
var source = [7, 10]; //It points to the source cell
var destination = [5, 20]; //It points to the destination cell
var movingSrc = false; //whether the source is moving or not
var movingDest = false; ////whether the destination is moving or not
var algo = null;
var ongoing = false; //It check if the algo is in process ot not
var makeWalls = false;
var cellsToAnimate = [];
var justFinished = false;
var animationState = null;
var delay = 8;

//************************************ 
//Function to generate a grid
//************************************ 

function createGrid(maxRows, maxCols) {
    var grid = "<table>"; //access table tag
    for (row = 1; row <= maxRows; row++) {
        grid += "<tr>"; //add the table row
        for (col = 1; col <= maxCols; col++) {
            grid += "<td></td>"; //add a data cell in the table row
        }
        grid += "</tr>"; //close the row tag
    }
    grid += "</table>" //close the table tag
    return grid;
}

var matrix = createGrid(maxRows, maxCols); //calls the function to create the grid
$("#tableHolder").append(matrix); //It appends the grid generated in javaScript into Html tableHolder id


//************************************ 
//Functions to move the start and end node
//************************************ 

function moveStartOrEnd(prevIndex, newIndex, startOrEnd) {
    var updatedY = newIndex % maxCols;
    var updatedX = Math.floor((newIndex - updatedY) / maxCols);
    if (startOrEnd == "start") {
        source = [updatedX, updatedY];
        console.log("Updated source is at [" + updatedX + ", " + updatedY + "]")
    } else {
        destination = [updatedX, updatedY];
        console.log("Updated destination is at [" + updatedX + ", " + updatedY + "]")
    }
    clearBoard(keepWalls = true); //if we move the nodes after running the algos then it clears the board and move the nodes
    return;
}


//************************************ 
//Function to update the start button name based on the algo chosen
//************************************ 

function updateStart() {
    if (algo == "Dijkstra") {
        $("#start").html("Run rover on Dijkstra");
    } else if (algo == "Breadth-First Search (BFS) with diagonals" || algo == "Breadth-First Search (BFS) without diagonals") {
        $("#start").html("Run rover on BFS");
    }
    return;
}

//************************************ 
//async function is used to operate asyncronously i.e independently of other functions
//This function comes into play when Algo starts, i.e, when start button is pressed
//************************************ 

async function beginAlgo(algo) {
    ongoing = true; //Algorithm is in progress
    var pathFound = executeAlgo(); //calls the function to execute algorithm
    await animateCells(); //The await operator is used to wait for a Promise. It is used inside an async function.
    ongoing = false; //Algorith is finished
    justFinished = true;
}

//************************************ 
//Function to execute the algo
//************************************ 

function executeAlgo() {
    if (algo == "Dijkstra") {
        var pathFound = dijkstra();
    } else if (algo == "Breadth-First Search (BFS) with diagonals") {
        var pathFound = bfs(true);
    }else if(algo == "Breadth-First Search (BFS) without diagonals"){
        var pathFound = bfs(false);
    }
    return pathFound;
}
//************************************ 
//Function to make the wall
//************************************ 

// updating visited array, to maks walls as visited
// it also prevents diagonal movement allowed algo from jumping through walls
function addWalls(vis, diagonal) {
    for (let i = 0; i < vis.length; i++) {
        {
            console.log(" haha, lol");
            // to check that the paricular cell is not a wall
            if ($($("#tableHolder").find("td")[i]).hasClass("wall")) {
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

//returns an array containing the directions along which movement is allowed, 
//depending on whether diagonal movement is allowd or not
function setDirection(diagonal){

    if(!diagonal)
        //direction vectors for no diagonal movement (right, down, left, up; in order)
        return [[0,1],[1,0],[0,-1],[-1,0]];
    else 
        //directions - right, down, left, up, right-down, right-up, left-up, left-down in order
        return [[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,1],[-1,-1],[1,-1]];
 
}


//funtion to obtain index value in 1D array from row and column
//or mapping 2D array to 1D array
function mapping1D(row, column, totalColumn){
	return (row * totalColumn) + column;
}
  
//function to obtain row and coulmn value from 1D array index value
//or mapping 1D array to 2D
function mapping2D(index, totalColumn){
    console.log(index, +" => "+index / totalColumn+" "+index % totalColumn);
	var position = [Math.floor(index / totalColumn), Math.floor(index % totalColumn)];
	return position
}

function prevCellArray(){
    //creating the previous array
    let prevArray = new Array();
    for(let i=0; i<maxRows; i++){
        //creating an array for 1 row
        let prevRows = [];
        for(let j=0; j<maxCols; j++){
            //adding null for each column in the prevRow
            prevRows.push(null);
        }
        // the row containing null for each column, is added to prevArray
        prevArray.push(prevRows);
    }
    return prevArray;
}


async function animateCells() {
    animationState = null;
    var cells = $("#tableHolder").find("td");
    var startCellIndex = (source[0] * (maxCols)) + source[1];
    var endCellIndex = (destination[0] * (maxCols)) + destination[1];
    var delay = getDelay();
    for (var i = 0; i < cellsToAnimate.length; i++) {
        var cellCoordinates = cellsToAnimate[i][0];
        var x = cellCoordinates[0];
        var y = cellCoordinates[1];
        var num = (x * (maxCols)) + y;
        if (num == startCellIndex || num == endCellIndex) { continue; }
        var cell = cells[num];
        var colorClass = cellsToAnimate[i][1];

        // Wait until its time to animate
        await new Promise(resolve => setTimeout(resolve, delay));

        $(cell).removeClass();
        $(cell).addClass(colorClass);
    }
    cellsToAnimate = [];
    //console.log("End of animation has been reached!");
    return new Promise(resolve => resolve(true));
}


function getDelay(speed){
	if(speed=="Fast")
		delay=3;
	if(speed=="Medium")
		delay=9;
	if(speed=="Slow")
		delay=20;
	console.log("Delay = " + delay);
	return delay;
}

function page_load()
{
    console.log("Hello! Different types of obstacles are made by varying the edge weight. Hence choose the different types of obstacles only in Dijkstra and not in BFS algorithm.")
}

function clearBoard( keepWalls ){
	var cells = $("#tableHolder").find("td");
	var startCellIndex = (source[0] * (maxCols)) + source[1];
	var endCellIndex = (destination[0] * (maxCols)) + destination[1];
	for (var i = 0; i < cells.length; i++){
			isWall = $( cells[i] ).hasClass("wall");
			isHill = $( cells[i] ).hasClass("hill");
			isCrater = $( cells[i] ).hasClass("crater");
			isIce = $( cells[i] ).hasClass("ice");
			isStorm = $( cells[i] ).hasClass("storm");
			$( cells[i] ).removeClass();
			if (i == startCellIndex){
				$(cells[i]).addClass("start"); 
			} else if (i == endCellIndex){
				$(cells[i]).addClass("end"); 
			} else if ( keepWalls && isWall ){ 
				$(cells[i]).addClass("wall"); 
			} else if(keepWalls && isHill){
				$(cells[i]).addClass("hill"); 
			} else if(keepWalls && isCrater){
				$(cells[i]).addClass("crater"); 
			} else if(keepWalls && isIce){
				$(cells[i]).addClass("ice"); 
			} else if(keepWalls && isStorm){
				$(cells[i]).addClass("storm"); 
			}
	}
}

// Ending statements
clearBoard();


document.getElementById("many").addEventListener("click", manyDestinations);
document.getElementById("checkpoint").addEventListener("click", checkpoint);

function manyDestinations() {
    // alert("Hello World!");
    window.location.replace("manyDestinations.html");
}
function checkpoint() {
    // alert("Hello World!");
    window.location.replace("Checkpoint.html");
}


//Javascript file to include mouse functions
document.write('<script type="text/javascript" src="Javascript files/Single destination/mouse_functions.js" ></script>');

//Javascript file to include Dijkstra algo
document.write('<script type="text/javascript" src="Javascript files/Single destination/dijkstra_algo.js" ></script>');

//Javascript file to include Breadth First Search algo
document.write('<script type="text/javascript" src="Javascript files/Single destination/bfs_new.js" ></script>');
