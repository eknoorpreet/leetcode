const groupAnagrams0 = function (strs) {
  const hashmap = {};
  //go through all strings
  for (let str of strs) {
    //generate a key to which anagrams will be hashed to
    //    const key = str.split("").sort().join("");
    const key = [...str].sort().join('');
    //map the str to the key, push to array of anagrams
    hashmap[key] ? hashmap[key].push(str) : (hashmap[key] = [str]);
  }
  return Object.values(hashmap);
};

/*
TC: Sorts the characters of the string, which takes O(k * log(k)) time, (where 'k' is the maximum length of a string in the array) for n strings => O(n * k * log(k))
SC: At worst, the number of keys and groups in the hashmap is the same as the number of unique sorted strings, which is at most 'n' (the number of input strings) => O(n)

https://leetcode.com/problems/group-anagrams/solutions/718955/three-js-solutions/comments/1084554
*/

// The most expensive operation was the generation of keys (sorting).
// How about we "key" the anagrams some other way?
const groupAnagrams = function (strs) {
  // We will build the result as a hashmap of [key] => [anagrams] just like before
  const res = {};
  // Go through all strings
  for (let str of strs) {
    // For each string, a new 26-length (indexed 0 - 25) [] with 0s
    // This will have frequencies of characters for that word
    // We will use this array to generate they key
    const count = new Array(26).fill(0);
    //'a'.charCodeAt()-97 => 0 (0th index will have counts for 'a')
    //'z'.charCodeAt()-97 => 25 (25th index will have counts for 'z')
    for (let char of str) {
      //['eat'] => char = 'e'
      //'e'.charCodeAt() - 97 => 4
      //count[4] = 1

      //'a'.charCodeAt() - 97 => 0
      //count[0] = 1

      //'t'.charCodeAt() - 97 => 19
      //count[19] = 1

      // Store frequencies of curr char in 'count' via .charCodeAt()
      const index = char.charCodeAt() - 97;
      count[index]++;
    }
    /*.join(""): It will fail in certain scenarios where the input has 10
      characters repeated.

      Ex: ["bdddddddddd","bbbbbbbbbbc"] -> With out a separator, both will
         have hash key value as 010100000000000000000000000
      Note, that first string has 10 d's in it & second string has 10 b's in it.*/

    // Build a key for curr group
    // O(26) operation, essentially O(1)
    let key = count.join('#');
    //a group of anagrams under 1 key

    // if(!result[key]) {
    //     result[key] = []
    // }
    // result[key].push(str)
    res[key] ? res[key].push(str) : (res[key] = [str]);
  }
  return Object.values(res);
};

// TC: O(n.k) (n: number of strings; k: max str length)
// SC: O(n.k)
