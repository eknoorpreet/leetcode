/*

Design a HashSet without using any built-in hash table libraries.

Implement MyHashSet class:

void add(key) Inserts the value key into the HashSet.
bool contains(key) Returns whether the value key exists in the HashSet or not.
void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.


Example 1:

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)


Constraints:

0 <= key <= 106
At most 10^4 calls will be made to add, remove, and contains.

*/

class ListNode {
  constructor(key, val, next = null) {
    this.key = key;
    this.next = next;
  }
}

const MyHashSet = function (key, val) {
  this.hashSet = Array(10000).fill(new ListNode(key));
};

MyHashSet.prototype.hash = function (key) {
  //100 % 1000 = 100
  //1100 % 1000 = 100 => all keys mapped b/w indices 0 - 9999
  return key % this.hashSet.length;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  //map the key to an index
  const index = this.hash(key);
  let curr = this.hashSet[index]; //the index of the linked list
  while (curr.next) {
    //key already exists => no need to add since set doesn't contain duplicates
    //we start from dummy node, so we check curr.next.key
    if (curr.next.key === key) return;
    curr = curr.next;
  }
  //we reached the end of the linked list and never found the key, add node
  //here, we're at curr, a non-null node. So, we're able to access curr.next
  curr.next = new ListNode(key);
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  const index = this.hash(key);
  let curr = this.hashSet[index]; //the index of the linked list
  while (curr && curr.next) {
    if (curr.next.key === key) {
      curr.next = curr.next.next;
      return;
    }
    curr = curr.next;
  }
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  const index = this.hash(key);
  let curr = this.hashSet[index]; //the index of the linked list
  while (curr && curr.next) {
    if (curr.next.key === key) return true;
    curr = curr.next;
  }
  return false;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
