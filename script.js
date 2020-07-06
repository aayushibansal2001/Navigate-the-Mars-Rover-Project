let container = document.getElementById('container'); //to extract the container id from html
let j = 84; //total number of cells

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
  str=grid[18];
  dest=grid[66];
  //setting their color  
  str.style.backgroundColor = "green";
  dest.style.backgroundColor = "red";

  
}

gridOperations(); //common grid operations
  
//to get a new grid
function newGrid() {
  location.reload(true); //to reload the page
 
}

//To get 1D index from row and column number
function mapping1D(row, column, totalColumn){
  return (cow * totalColumn) + column;
}

//To get row and coulmn from index in 1D array
function mapping2D(index, totalColumn){
  var position = [index / totalColumn, index % totalColumn];
  return position
}
