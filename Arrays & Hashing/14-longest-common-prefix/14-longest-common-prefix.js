/*

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".



Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.


Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.

*/

/**
 * @param {string[]} strs
 * @return {string}
 */

// const longestCommonPrefix = function(strs) {
//     let min = 200;
//     let shortestStr = ''
//     for(let str of strs) {
//         if(str.length < min) {
//             shortestStr = str
//         }
//     }
//     //the longest prefix would be equal to or less than the shortest string
//     //find the shortest string and see if it exists in other strings
//     for(let str of strs) {
//         if(str.slice(0, shortestStr.length) === shortestStr) continue;
//         else {
// while(!(str.slice(0, shortestStr.length) === shortestStr)) {
//     shortestStr = shortestStr.slice(0, shortestStr.length - 1)
// }
//         }
//     }
//     return shortestStr
// };

//max prefix length = length of the shortest string
//the longest prefix would be equal to or less than the shortest string
//find the shortest string and see if it exists in other strings
const longestCommonPrefix1 = function (strs) {
  let prefix = '';
  let min = 200;
  for (let str of strs) {
    if (str.length < min) {
      shortestStr = str;
      min = str.length;
    }
  }
  for (let str of strs) {
    if (str.slice(0, min) === shortestStr) continue;
    while (str.slice(0, min) !== shortestStr) {
      min--;
      shortestStr = shortestStr.slice(0, min);
    }
  }
  return shortestStr;
};

/*

The time complexity of this code is dominated by the second loop, which is O(n * min^2).
Space complexity is O(1)

*/

const longestCommonPrefix = function (strs) {
  let result = '';
  //take any 1 string as base and go through it
  //(we know that first does exist so use that)
  for (let i = 0; i < strs[0].length; i++) {
    //go through all strings
    for (let str of strs) {
      // if the ith character in any string doesn't match
      // OR i is out of bounds
      if (i === str.length || str[i] !== strs[0][i]) return result;
    }
    //Basically, if the ith character in all strings match
    //=> prefix till now! => keep appending the first string to result
    result += strs[0][i];
  }
  return result;
};

/*

Overall, the time complexity of this code is O(n * m), where 'n' is the number of strings
in the strs array, and 'm' is the length of the first string (the base string).

The space complexity depends on the length of the common prefix.
In the worst case, where all strings have the same common prefix, the space complexity can be
O(m), where 'm' is the length of the common prefix.

*/
