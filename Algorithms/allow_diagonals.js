

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