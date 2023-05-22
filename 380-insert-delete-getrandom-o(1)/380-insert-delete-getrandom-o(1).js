var RandomizedSet = function () {
  this.map = new Map();
  this.list = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */

/*insertion and removal in O(1) is easier using constant using set as compared to lists. Can also tell if the value already exists.

{1, 2, 3}, indices: 0, 1, 2: generate a random value within this range. But sets don't have indices! We can convert set to list for the getRandom function that will take O(n) time. 
Solution: Maintain a list/array alongside.

While removing from set, also remove from list. {1, 2, 3} => {1, 2}, list: [1, 2, 3] => [1, 2] and generate a random value from [1, 2], but what if we remove from middle? => O(n) (searching the value since we don't know the index)
Solution: use a map with value mapped to index {1: 0, 2: 1, 3: 2}. How about we replace the value to be removed with something else? Now, it has a disproportionate chance. 
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

// /**
//  * @param {number} val
//  * @return {boolean}
//  */

RandomizedSet.prototype.remove = function (val) {
  const isValuePresent = this.map.has(val);
  if (isValuePresent) {
    const index = this.map.get(val);
    const lastVal = this.list[this.list.length - 1];
    this.list[index] = lastVal; //copy last value to index position and remove it from last
    this.map.set(lastVal, index); //update index of last value in map
    this.map.delete(val);
    this.list.pop();
  }
  return isValuePresent;
};

// /**
//  * @return {number}
//  */
RandomizedSet.prototype.getRandom = function () {
  return this.list[Math.floor(Math.random() * this.list.length)];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
