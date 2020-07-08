

// this creates a 2D array equal to the size of our grid
// each element of the array will store the previous node of that element, as per any given algorithm
// i.e, store [row, column] of the cell from which the current cell was reached
function prevCellArray(){
    //creating the previous array
    let prevArray = new Array();
    for(let i=0; i<totalRows; i++){
        //creating an array for 1 row
        let prevRows = [];
        for(let j=0; j<totalCols; j++){
            //adding null for each column in the prevRow
            prevRows.push(null);
        }
        // the row containing null for each column, is added to prevArray
        prevArray.push(prevRows);
    }
    return prevArray;
}