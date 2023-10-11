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

//Sorting takes a significant time. How about we "key" the anagrams some other way?
const groupAnagrams = function (strs) {
  //we will build the result as a hashmap of [key] => [anagrams]
  const res = {};
  //go throough all strings
  for (let str of strs) {
    //for each string, a new 26-length (indexed 0 - 25) [] with 0s
    let count = new Array(26).fill(0);
    //'a'.charCodeAt()-97 => 0 (0th index will have counts for 'a')
    //'z'.charCodeAt()-97 => 25 (25th index will have counts for 'z')
    for (let char of str) {
      //['eat'] => char = 'e'
      //'e'.charCodeAt() - 97 => 4
      //count[4] = 1

      //'a'.charCodeAt() - 97 => 1
      //count[1] = 1

      //'t'.charCodeAt() - 97 => 19
      //count[19] = 1

      //store frequencies of curr char in 'count' via .charCodeAt()
      const code = char.charCodeAt() - 97;
      count[code]++;
    }
    /*.join(""): It will fail in certain scenarios where the input has 10
      characters repeated.

      Ex: ["bdddddddddd","bbbbbbbbbbc"] -> With out a separator, both will
         have hash key value as 010100000000000000000000000
      Note, that first string has 10 d's in it & second string has 10 b's in it.*/

    //build a key for curr group
    //O(26) operation, essentially O(1)
    const key = count.join('#');
    //a group of anagrams under 1 key

    // if(!result[key]) {
    //     result[key] = []
    // }
    // result[key].push(str)

    //all strings resulting intp the same key (same char with same freq) will be under that 1 key
    // console.log(res)
    /*

{
'1#0#0#0#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0': [ 'eat', 'tea', 'ate' ],
'1#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#1#0#0#0#0#0#0': [ 'tan', 'nat' ],
'1#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0': [ 'bat' ]
 }

 */
    res[key] ? res[key].push(str) : (res[key] = [str]);
  }
  return Object.values(res);
};

// TC: O(n.k) (n: number of strings; k: max str length)
// SC: O(n.k)
