/*

There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.



Example 1:

Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
Example 2:

Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true


Constraints:

1 <= trips.length <= 1000
trips[i].length == 3
1 <= numPassengersi <= 100
0 <= fromi < toi <= 1000
1 <= capacity <= 10^5

*/

/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */

/**
 * @param {string} s
 * @return {string}
 */

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MyPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      // lower priority number = higher priority
      // as long as the element's priority is lesser than the parent's => keep swapping
      if (element.priority < parent.priority) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        //make sure it's in bounds
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  peek() {
    return this.values[0];
  }
}

/*

We have a car that:

Can only drive east (one direction)
Has a fixed passenger capacity
Needs to handle multiple trips where each trip specifies:
  Number of passengers
  Pickup location (in km from start)
  Drop-off location (in km from start)

Solution Intuition:
The key insights are:

Sort trips by start location (since car only goes east)
Use a priority queue to track drop-offs [numPass, dropOffLocation]
  (The passengers we should drop off are those whose drop-off location is earliest, i.e. (smallest number))
  This lets us efficiently track who needs to be dropped off next and
  free up capacity before picking up new passengers
Track current passengers as we move along
Drop off passengers before picking up new ones at each location

*/

const carPooling = function (trips, capacity) {
  // Sort based on the starting position
  // Why? Because the car can only go right (east)
  // So, we cannot go to 2, then 1. So, we need to sort (based on the starting position)
  trips.sort((a, b) => a[1] - b[1]);
  const pq = new MyPriorityQueue();
  let currPass = 0;
  for (const trip of trips) {
    const [numPass, start, end] = trip;
    // What's our current position? Our current 'start'
    // Is it time for a drop-off
    while (pq.values.length && pq.peek().priority <= start) {
      // Drop off!
      currPass -= pq.dequeue().val;
    }
    currPass += numPass;
    if (currPass > capacity) return false;
    pq.enqueue(numPass, end);
  }
  return true;
};

/*

Time Complexity

Sorting the Trips:
The trips are sorted based on their starting position.
Sorting takes O(nlogn) time, where n is the number of trips.

Processing Each Trip:
We iterate over the sorted trips once, which takes O(n) time.
For each trip, we may perform several heap operations:
Enqueue operation: Inserting an element into the priority queue (max-heap) takes
O(logm), where m is the number of elements in the heap.
Dequeue operation: Removing the element with the highest priority from the heap takes O(logm).
In the worst case, the heap might contain all the trips, so m=n.

Heap Operations:
During each trip processing, we might perform up to O(logn) heap operations for enqueuing and dequeuing.
Since each trip is processed once, the total number of heap operations across all trips is O(nlogn).

Summarizing the time complexity:
Sorting the trips: O(nlogn)
Processing each trip: O(nlogn) for heap operations
Overall, the time complexity is O(nlogn).

Space Complexity

Storage for Trips:
We store the trips array, which requires O(n) space.
Priority Queue Storage:
The priority queue stores elements corresponding to the trips. In the worst case, it can store up to
n elements.
Therefore, the space required for the heap is O(n).

Summarizing the space complexity:

Storage for trips: O(n)
Priority queue storage: O(n)
Overall, the space complexity is
O(n).

*/
