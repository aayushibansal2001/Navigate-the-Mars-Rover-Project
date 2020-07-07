
//A class for creating queues.
class Queue{
    constructor(){
        this.nodes = [];
    }

    //function to add a node to the queue
    enqueue(value){
        this.nodes.push(value);
    }

    //function to delete a node from the queue
    dequeue(){
        if(this.isEmpty())
            return "Empty";
        else
            return this.nodes.shift();
    }

    //function to check if the queue is empty
    isEmpty(){ 
        return this.nodes.length == 0; 
    }

    //function to print the contents of the queue
    printQueue(){ 
        var str = ""; 
        for(var i = 0; i < this.nodes.length; i++) 
            str += this.nodes[i] +" "; 
        return str; 
    }

}