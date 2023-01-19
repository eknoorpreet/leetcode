// https://leetcode.com/problems/fruit-into-baskets/

/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = function (fruits) {
  let maxLength = 0;
  //since we need to find the longest substring, we need to make sure that we're utilizing all k distinct elements
  //a hashmap (with its size) can give us the number of distinct elements and
  //its values can give us the frequencies
  let map = new Map(); //will hold k distinct elements and their frequencies (act as a slidiing window)
  let start = 0;
  for (let end = 0; end < fruits.length; end++) {
    map.set(fruits[end], (map.get(fruits[end]) || 0) + 1);
    //map size exceeding 2
    while (map.size > 2) {
      //slide/shrink the window (decrease its frequency)
      //as long as window (map) size is k again
      map.set(fruits[start], map.get(fruits[start]) - 1);
      if (map.get(fruits[start]) === 0) {
        map.delete(fruits[start]);
      }
      start++;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

totalFruit([1, 2, 3, 2, 2]);

//TC: O(n): The for loop runs for n elements while the inner while loop runs only when map size > 2
//and slides the window accordingly (running through each element once) => O(n + n) => O(n)
//SC: O(1): As we can only have a max of 3 fruit types in the map
