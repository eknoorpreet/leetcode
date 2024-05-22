/*

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).


Example 1:

Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.


Constraints:

1 <= k <= points.length <= 10^4
-10^4 <= xi, yi <= 10^4

*/

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
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
}

/*

  Since we're comparing distances and need to find the closest points,
  we can avoid computing the square root and use the squared distance
  (x1 - x2)^(1/2) + (y1 - y2)^(1/2)

  We can use a priority queue (max heap) with 'distance' of the points
  as the 'priority'.

  We want the k closest points to origin, i.e. finding the
  point with smaller distance to origin. The priority queue removes the element
  with a smaller value first (higher priority)! But, since we'll be removing the
  point when it exceeds k, we're interested in what remains in the queue at the end.
  Why? Because we want ALL the k closest points, not the kth closest point!
  So, we need to remove anything exceeding the k limit and the
  entire priority queue will be the answer (will need some modification...)!

  Since the above priorty queue is based on min heap, we can simulate a max heap by
  storing the distance value as a negative.

  */

const kClosest = function (points, k) {
  const pq = new MyPriorityQueue();
  for (const point of points) {
    let distanceToOrigin = -(point[0] * point[0] + point[1] * point[1]);
    pq.enqueue(point, distanceToOrigin);
    if (pq.values.length > k) pq.dequeue();
  }
  let result = pq.values.map((el) => el.val);
  return result;
};

/*

Time Complexity:

Since each insertion or removal operation is O(logk) and we perform these operations for each of the
n points, the total time complexity is: O(nlogk), where
n is the number of points and k is the number of closest points to find.

Space Complexity:
O(k), where k is the number of closest points to find.

*/
