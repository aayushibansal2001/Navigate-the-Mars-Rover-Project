//************************************ 
//Mouse functions
//************************************ 

$("td").mousedown(function() {
    var index = $("td").index(this);
    var startCellIndex = (source[0] * (maxCols)) + source[1];
    var endCellIndex = (destination[0] * (maxCols)) + destination[1];
    var checkpoint1Index = (checkpoint1[0] * (maxCols)) + checkpoint1[1];
    if (!ongoing) {
        // Clear board if just finished
        if (justFinished && !ongoing) {
            clearBoard(keepWalls = true);
            justFinished = false;
        }
        if (index == startCellIndex) {
            movingSrc = true;
            //console.log("Now moving start!");
        } else if (index == endCellIndex) {
            movingDest = true;
            //console.log("Now moving end!");
        } else if (index == checkpoint1Index) {
            movingCheck1 = true;
            //console.log("Now moving end!");
        } else {
            makeWalls = true;
        }
    }
});


$("td").mouseup(function() {
    makeWalls = false;
    movingSrc = false;
    movingDest = false;
    movingCheck1 = false;
});


$("td").mouseenter(function() {
    if (!makeWalls && !movingSrc && !movingDest && !movingCheck1) { return; }
    var index = $("td").index(this);
    var startCellIndex = (source[0] * (maxCols)) + source[1];
    var endCellIndex = (destination[0] * (maxCols)) + destination[1];
    var checkpoint1Index = (checkpoint1[0] * (maxCols)) + checkpoint1[1];
    if (!ongoing) {
        if (justFinished) {
            clearBoard(keepWalls = true);
            justFinished = false;
        }
        //console.log("Cell index = " + index);
        if (movingSrc && index != endCellIndex && index != checkpoint1Index) {
            moveStartOrEnd(startCellIndex, index, "start");
        } else if (movingDest && index != startCellIndex && index != checkpoint1Index) {
            moveStartOrEnd(endCellIndex, index, "end");
        } else if (movingCheck1 && index != startCellIndex && index != endCellIndex) {
            moveStartOrEnd(checkpoint1Index, index, "check1");
        } else if (index != startCellIndex && index != endCellIndex && index != checkpoint1Index) {
            $(this).toggleClass("wall");
        }


    }
});


$("td").click(function() {
    var index = $("td").index(this);
    var startCellIndex = (source[0] * (maxCols)) + source[1];
    var endCellIndex = (destination[0] * (maxCols)) + destination[1];
    var checkpoint1Index = (checkpoint1[0] * (maxCols)) + checkpoint1[1];
    if ((ongoing == false) && !(index == startCellIndex) && !(index == endCellIndex) && !(index == checkpoint1Index)) {
        if (justFinished) {
            clearBoard(keepWalls = true);
            justFinished = false;
        }
        $(this).toggleClass("wall");
    }
});


$("body").mouseup(function() {
    makeWalls = false;
    movingSrc = false;
    movingDest = false;
    movingCheck1 = false;
});


$("#start").click(function() {
    if (algo == null) { return; }
    if (ongoing) { update("wait"); return; }
    beginAlgo(algo);
});

$("#clear").click(function() {
    if (ongoing) { update("wait"); return; }
    clearBoard(keepWalls = false);
});


$("#algorithms .dropdown-item").click(function() {
    if (ongoing) { update("wait"); return; }
    algo = $(this).text();
    updateStart();
    console.log("Algorithm has been changd to: " + algo);
});