/*

Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
You must implement the functions of the class such that each function works in average O(1) time complexity.



Example 1:

Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.


Constraints:

-2^31 <= val <= 2^31 - 1
At most 2 * 10^5 calls will be made to insert, remove, and getRandom.
There will be at least one element in the data structure when getRandom is called.

*/

const RandomizedSet = function () {
  this.map = new Map();
  this.list = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */

/*

insertion and removal in O(1) is easier using set as compared to lists. Can also tell if the value already exists.

{1, 2, 3}, indices: 0, 1, 2: generate a random value within this range. But sets don't have indices! We can convert set to list for the getRandom function that will take O(n) time.
Solution: Maintain a list/array alongside.

While removing from set, also remove from list. {1, 2, 3} => {1, 2}, list: [1, 2, 3] => [1, 2] and generate a random value from [1, 2], but what if we remove from middle? => O(n) (searching the value since we don't know the index)
Solution: use a map with value mapped to index {1: 0, 2: 1, 3: 2}.

How about we replace the value to be removed with something else? Now, it has a disproportionate chance.
Solution: We can replace it with the last value of list and pop from the end => O(1)

*/

RandomizedSet.prototype.insert = function (val) {
  const isValuePresent = this.map.has(val);
  //if the value isn't present
  if (!isValuePresent) {
    //insert it mapping it to index of size
    this.map.set(val, this.map.size);
    //also add to list
    this.list.push(val);
  }
  return !isValuePresent;
};

/**
 * @param {number} val
 * @return {boolean}
 */

RandomizedSet.prototype.remove = function (val) {
  const isValuePresent = this.map.has(val);
  if (isValuePresent) {
    const index = this.map.get(val);
    const lastVal = this.list[this.list.length - 1];
    //resetting index of the last value in both map and list
    this.list[index] = lastVal; //copy last value to index position and remove it from last
    this.map.set(lastVal, index); //update index of last value in map
    //deleting the value in both map and list
    this.map.delete(val);
    this.list.pop();
  }
  return isValuePresent;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  return this.list[Math.floor(Math.random() * this.list.length)];
};

// /**
//  * Your RandomizedSet object will be instantiated and called as such:
//  * var obj = new RandomizedSet()
//  * var param_1 = obj.insert(val)
//  * var param_2 = obj.remove(val)
//  * var param_3 = obj.getRandom()
//  */
