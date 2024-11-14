/*

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.



Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


Constraints:

1 <= capacity <= 3000
0 <= key <= 10^4
0 <= value <= 10^5
At most 2 * 10^5 calls will be made to get and put.

*/

/*

/*

Key Intuition:

Need O(1) access → Use HashMap
Need O(1) removal/addition → Use Doubly Linked List
Most recently used → Move to front
Least recently used → At the end

In order to preserve the ordering we need a doubly linked list. Why doubly?
Able to reorder nodes in O(1) time.

Head: Least Recently Used

Tail: Most Recently Used

Why This Design Works:

HashMap (this.cache):

Provides O(1) access to nodes
Stores key-node pairs


Doubly Linked List:

Head = Most Recently Used
Tail = Least Recently Used
Dummy nodes simplify edge cases


*/

function Node(key, val, prev, next) {
  this.key = key;
  this.val = val;
  this.prev = prev;
  this.next = next;
}

/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
  this.size = 0;
  // Most Frequently Used
  this.head = new Node();
  this.head.prev = null;
  // Least Frequently Used
  this.tail = new Node();
  this.tail.next = null;
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.capacity = capacity;
  this.cache = {};
};

/**
 * @param {number} key
 * @return {number}
 */

/*

In order to preserve the ordering we need a doubly linked list. Why doubly?
Able to reorder nodes in O(1) time.

Head: Least Recently Used

Tail: Most Recently Used


*/

LRUCache.prototype.get = function (key) {
  const node = this.cache[key];
  if (node) {
    // Extract (remove)
    this.removeNode(node);
    // Move to head
    // This way, we know the order (when it was recently used)
    this.moveToHead(node);
    return node.val;
  }
  // Key doesn't exist => -1
  return -1;
};

LRUCache.prototype.removeNode = function (node) {
  node.prev.next = node.next;
  if (node.next) {
    node.next.prev = node.prev;
  }
};

LRUCache.prototype.moveToHead = function (node) {
  node.prev = this.head;
  node.next = this.head.next;
  this.head.next.prev = node;
  this.head.next = node;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */

// Already exists? update and move to head. Else, insert and move to head
LRUCache.prototype.put = function (key, value) {
  const node = this.cache[key];
  // Exists?
  if (node) {
    // Update
    node.val = value;
    this.removeNode(node);
    this.moveToHead(node);
  } else {
    //else, insert and move to head
    const node = new Node(key, value);
    // Here, we don't have to remove the node since it's not added yet.
    // Instead, we're directly moving it to the head!
    this.moveToHead(node);
    this.cache[key] = node;
    this.size++;

    // Check capacity
    if (this.size > this.capacity) {
      // Remove the LRU (Least Recently Used) key
      // this.tail is the dummy tail
      // this.tail.prev is the actual tail
      const tail = this.tail.prev;
      this.removeNode(tail);
      delete this.cache[tail.key];
      this.size--;
    }
  }
};

/*

Time & Space Complexity:

Time: O(1) for both get and put

HashMap provides O(1) lookup
Linked list operations are all O(1)


Space: O(capacity)

HashMap stores at most capacity items
Linked list stores at most capacity nodes

*/

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
