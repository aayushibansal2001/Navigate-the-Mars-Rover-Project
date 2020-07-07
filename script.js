let container = document.getElementById('container'); //to extract the container id from html
let j = 576; //total number of cells
var algorithm= null;

function gridOperations() {
    let i = 0;
  
    function addCell(){
        let newCell = document.createElement('cell'); //declare a new cell
        newCell.setAttribute('class', 'grid'); // new class
        container.appendChild(newCell); // add to the container
    }
  
    //create j cells
    for (i = 0; i < j; i++) {
    addCell();
    }
  
    //Create variable for grid class
    let grid = document.getElementsByClassName('grid');

    //Apply event listener to all grid elements after they have been created
    for (let i = 0; i < j; i++) {
        grid[i].addEventListener('mousedown', makewall)
        }
  
  //makes the walls on clicking the cell
  function makewall(e) {
      e.toElement.style.backgroundColor = "black";
    }
  
  //Button instructions
    let clrButton = document.getElementById('clearBtn');
    clrButton.addEventListener('click', newGrid); //when clear the board is clicked

//this is the start and end nodes
  str=grid[74];
  dest=grid[343];

  //setting their color  
//str.style.backgroundImage = "url('rover.png')";
  str.style.backgroundColor = "green";
  dest.style.backgroundColor = "red";

}


gridOperations(); //common grid operations

//to change algo name at dropdown 
$( "#algorithms .dropdown-item").click(function(){
		algorithm = $(this).text();
	updateStartBtnText();
	console.log("Algorithm has been changd to: " + algorithm);
});

//to u
function updateStartBtnText(){
	if (algorithm == "Depth-First Search (DFS)"){
		$("#startBtn").html("Start DFS");
	} else if (algorithm == "Breadth-First Search (BFS)"){
		$("#startBtn").html("Start BFS");
	} else if (algorithm == "Dijkstra"){
		$("#startBtn").html("Start Dijkstra");
	} else if (algorithm == "A*"){
		$("#startBtn").html("Start A*");
	} else if (algorithm == "Greedy Best-First Search"){
		$("#startBtn").html("Start Greedy BFS");
	} else if (algorithm == "Jump Point Search"){
		$("#startBtn").html("Start JPS");
	}
	return;
}





//to get a new grid
function newGrid() {
  location.reload(true); //to reload the page
 
}
