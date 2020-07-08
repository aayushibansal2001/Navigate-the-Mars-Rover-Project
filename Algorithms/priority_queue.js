// ----------------------This is Priority Queue, that finds smallest in O(n)


// class to define the type of elements 
// class PNode { 
//     constructor(index, distance) 
//     { 
//         //"index" stores the index of the node, through which we can access it's value 
//         this.index = index; 
//         //"distance" stores the distance of each node from the source node (start cell)
//         this.distance = distance; 
//     } 
// }

// //class to define priority queue
// class PriorityQueue { 
  
//     // An array is used to implement priority 
//     constructor() { 
//         this.nodes = []; 
//     } 
  
//     enqueue(index, distance){ 
//     // create a new PNode type object, ie,
//     // a node for priority queue that contains index and distance from source
//     // priority is defined by "distace"
//     // lesser the distance, higher the priority
//     var pNode = new PNode(index, distance); 
//     var contain = false; 
  
    
//     for (var i = 0; i < this.nodes.length; i++) { 
//         if (this.items[i].distance > pNode.distance) { 
//             // Once the correct location is found it is 
//             // enqueued 
//             this.items.splice(i, 0, qElement); 
//             contain = true; 
//             break; 
//         } 
//     } 
  
//     // if the element have the highest priority 
//     // it is added at the end of the queue 
//     if (!contain) { 
//         this.items.push(qElement); 
//     } 
// }
// }


//--------------------------------------- Priority queue to find smallest in O(log n)


//for the top element of the heap, ie, smallest element
const top = 0;
//sets parent as (i+1)/2 - 1 
const parent = i => ((i + 1) >>> 1) - 1;
//sets left as i*2 + 1
const left = i => (i << 1) + 1;
// sets right as (i+1)*2
const right = i => (i + 1) << 1;

class PriorityQueue {
  //comparator function to compare 2 values  
  constructor(comparator = (a, b) => a > b) {
    this.heap = [];
    this.comparator = comparator;
  }
  //gives the size of priority queue
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this.heap[top];
  }
  add(...values) {
    values.forEach(value => {
      this.heap.push(value);
      this.siftUp();
    });
    return this.size();
  }
  poll() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this.swap(top, bottom);
    }
    this.heap.pop();
    this.siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this.heap[top] = value;
    this.siftDown();
    return replacedValue;
  }
  greater(i, j) {
    return this.comparator(this.heap[i], this.heap[j]);
  }
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  siftUp() {
    let node = this.size() - 1;
    while (node > top && this.greater(node, parent(node))) {
      this.swap(node, parent(node));
      node = parent(node);
    }
  }
  siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this.greater(left(node), node)) ||
      (right(node) < this.size() && this.greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this.greater(right(node), left(node))) ? right(node) : left(node);
      this.swap(node, maxChild);
      node = maxChild;
    }
  }
}

