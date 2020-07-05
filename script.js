// function that builds a grid in the "container"
function createGrid(x,y) {
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < y; columns++) {
            $("#container").append("<div class='grid'></div>");
        };
    };
    $(".grid").width(960/y);
    $(".grid").height(460/x);
};


// function that clears the grid
function clearGrid(){
    $(".grid").empty();
};  


function refreshGrid(){
    clearGrid();
    /*createGrid(15,25);*/
};

var createWalls = false;

$(document).ready(function() {

    // create a 15x25 grid when the page loads
    createGrid(15,25); 

    // creates a mousedown effect that changes the color of a square to black when the mouse presses over it, leaving a (pixel) trail through the grid
    $(".grid").mousedown(function() {   
        $(this).css("background-color", "black");
        createWalls=true;  //It will create the walls.

        $(".grid").mouseenter(function() {   
            if(createWalls==false)
            return;
            
            $(this).css("background-color", "black");
            createWalls=true;
            
            
        });
    });
    
    
    $(".grid").mouseup(function(){
        createWalls = false;  //stop creating the wall
    });

    // allows the click of a button to prompt the user to create a new grid
    $("#clearBtn").click(function() {
        location.reload(true);

        /*refreshGrid();*/
    });

    
});




  


  