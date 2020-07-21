//************************************ 
//Mouse functions
//************************************ 

var createHill = false;
var createCrater = false;
var createIce = false;
var createStorm = false;

$( "td" ).mousedown(function(){
	let index = $( "td" ).index( this );
	let startCellIndex = (source[0] * (maxCols)) + source[1];
	let endCellIndex = (destination[0] * (maxCols)) + destination[1];
	if ( !ongoing ){
		// Clear board if just finished
		if ( justFinished  && !ongoing ){ 
			clearBoard( keepWalls = true ); 
			justFinished = false;
		}
		if (index == startCellIndex){
			movingSrc = true;
			//console.log("Now moving start!");
		} else if (index == endCellIndex){
			movingDest = true;
			//console.log("Now moving end!");
		} else {
			makeWalls = true;
		}
	}
});


$( "td" ).mouseup(function(){
	makeWalls = false;
	movingSrc = false;
	movingDest = false;
});

function hill_true() {
	createHill = document.getElementById("hillCheck").checked;
	document.getElementById("iceCheck").checked = false;
	document.getElementById("stormCheck").checked = false;
	document.getElementById("craterCheck").checked = false;
	createCrater = false;
    createIce = false;
	createStorm = false;
}

function crater_true() {
	createCrater = document.getElementById("craterCheck").checked;
	document.getElementById("iceCheck").checked = false;
	document.getElementById("stormCheck").checked = false;
	document.getElementById("hillCheck").checked = false;
	createHill = false;
    createIce = false;
	createStorm = false;
}

function ice_true() {
	createIce = document.getElementById("iceCheck").checked;
	document.getElementById("hillCheck").checked = false;
	document.getElementById("stormCheck").checked = false;
	document.getElementById("craterCheck").checked = false;
	createCrater = false;
    createHill = false;
	createStorm = false;
}

function storm_true() {
	createStorm = document.getElementById("stormCheck").checked;
	document.getElementById("iceCheck").checked = false;
	document.getElementById("hillCheck").checked = false;
	document.getElementById("craterCheck").checked = false;
	createCrater = false;
    createIce = false;
	createHill = false;
}

$( "td" ).mouseenter(function() {
	if (!makeWalls && !movingSrc && !movingDest){ return; }
    let index = $( "td" ).index( this );
    let startCellIndex = (source[0] * (maxCols)) + source[1];
	let endCellIndex = (destination[0] * (maxCols)) + destination[1];
    if (!ongoing){
    	if (justFinished){ 
    		clearBoard( keepWalls = true );
    		justFinished = false;
    	}
    	//console.log("Cell index = " + index);
    	if (movingSrc && index != endCellIndex) {
    		moveStartOrEnd(startCellIndex, index, "start");
    	} else if (movingDest && index != startCellIndex) {
    		moveStartOrEnd(endCellIndex, index, "end");
    	} else if (index != startCellIndex && index != endCellIndex) {
			if(createHill){
				$(this).toggleClass("hill");
			}
			else if(createCrater){
				$(this).toggleClass("crater");
			}
			else if(createIce){
				$(this).toggleClass("ice");
			}
			else if(createStorm){
				$(this).toggleClass("storm");
			}
			else{
				$(this).toggleClass("wall");
			}
			// var class_type = $(this).attr('class');
			// $(this).toggleClass("class_type");
    	}
    }
});


$( "td" ).click(function() {
    let index = $( "td" ).index( this );
    let startCellIndex = (source[0] * (maxCols)) + source[1];
	let endCellIndex = (destination[0] * (maxCols)) +destination[1];
    if ((ongoing == false) && !(index == startCellIndex) && !(index == endCellIndex)){
    	if ( justFinished ){ 
    		clearBoard( keepWalls = true );
    		justFinished = false;
		}
		if(createHill){
			$(this).toggleClass("hill");
		}
		else if(createCrater){
			$(this).toggleClass("crater");
		}
		else if(createIce){
			$(this).toggleClass("ice");
		}
		else if(createStorm){
			$(this).toggleClass("storm");
		}
		else{
			$(this).toggleClass("wall");
		}	

    }
});


$( "body" ).mouseup(function(){
	makeWalls = false;
	movingSrc = false;
	movingDest = false;
});


$( "#start" ).click(function(){
    if ( algo == null ){ return;}
    if (ongoing ){ update("wait"); return; }
	beginAlgo(algo);
});

$( "#clear" ).click(function(){
    if ( ongoing ){ update("wait"); return; }
	clearBoard(keepWalls = false);
});


$( "#algorithms .dropdown-item").click(function(){
	if ( ongoing ){ update("wait"); return; }
	algo = $(this).text();
	updateStart();
	console.log("Algorithm has been changd to: " + algo);
});


$( "#speed .dropdown-item").click(function(){
	speed = $(this).text();
	getDelay(speed);
});