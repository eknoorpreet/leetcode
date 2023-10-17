/*

Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:

MyHashMap() initializes the object with an empty map.
void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.


Example 1:

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]


Constraints:

0 <= key, value <= 106
At most 104 calls will be made to put, get, and remove.

*/

class ListNode {
  constructor(key, val, next = null) {
    this.key = key;
    this.val = val;
    this.next = next;
  }
}

const MyHashMap = function (key, val, next) {
  //initalize every index with a dummy node
  //a limit of 1000 operations => at most 1000 elements
  this.hashMap = Array(1000).fill(new ListNode(key, val));
};

MyHashMap.prototype.hash = function (key) {
  //100 % 1000 = 100
  //1100 % 1000 = 100 => all keys mapped b/w indices 0 - 999
  return key % this.hashMap.length;
};

// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
MyHashMap.prototype.put = function (key, value) {
  //map the key to an index
  const index = this.hash(key);
  let curr = this.hashMap[index]; //the index of the linked list
  //if we do while(curr), at the end, we'll reach a null node. But we want to
  //stop at the node before it so we can link it to the new one
  while (curr.next) {
    //key already exists => update its value
    //we start from dummy node, so we check curr.next.key
    if (curr.next.key === key) {
      curr.next.val = value;
      return;
    }
    curr = curr.next;
  }
  //we reached the end of the linked list and never found the key, add node
  //here, we're at curr, a non-null node. So, we're able to access curr.next
  curr.next = new ListNode(key, value);
};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  const index = this.hash(key);
  let curr = this.hashMap[index].next; //the index of the linked list
  while (curr) {
    if (curr.key === key) {
      return curr.val;
    }
    curr = curr.next;
  }
  //key not found => -1
  return -1;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  const index = this.hash(key);
  let curr = this.hashMap[index]; //the index of the linked list
  while (curr && curr.next) {
    if (curr.next.key === key) {
      curr.next = curr.next.next;
      return;
    }
    curr = curr.next;
  }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
