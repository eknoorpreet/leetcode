/*

Given a string s, return the number of unique palindromes of length three that are a subsequence of s.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".


Example 1:

Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
Example 2:

Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
Example 3:

Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")


Constraints:

3 <= s.length <= 10^5
s consists of only lowercase English letters.

*/

/**
 * @param {string} s
 * @return {number}
 */

// const countPalindromicSubsequence = function(s) {
//     const result = new Set()
//     const left = new Set()
//     const right = new Map()
//     for(let c of s) {
//         right.set(c, (right.get(c) || 0) + 1)
//     }
//     for(let i = 0; i < s.length; i++) {
//         right.set(s[i], right.get(s[i]) - 1)
//         if(right.get(s[i]) === 0) right.delete(s[i])

//         for(let j = 0; j < 26; j++) {
//             const c = String.fromCharCode(97 + j)
//             if(left.has(c) && right.has(c)) result.add(`(${s[i]}, ${c})`)
//         }
//         left.add(s[i])
//     }
//     console.log(result)
//     return result.size
// };

/* Palindrome of length 3: "aca", "aba". Basically, first and last characters need to be the same.

We track the first and last occurence of each character.

Then, for each character, we count *unique* characters between its first and last occurence. That is the number of palindromes with that character in the first and last positions.

Example: "abcbba", we have two unique chars between first and last a (c and b) resulting in:
"aba"
"aca"

and two - between first and last b (b and c) resulting in:
"bbb"
"bcb"

No characters in between c so it forms no palindromes. */

/*Complexity Analysis

Time: O(n). We go though the string fixed number of times.
Memory: O(1)

*/

const countPalindromicSubsequence = function (s) {
  let result = 0;
  //keep track of the first occurrence index of each character.
  const first = Array(26).fill(Number.MAX_VALUE);
  //keep track of the last occurrence index of each character.
  const last = Array(26);
  for (let i = 0; i < s.length; i++) {
    //"aabca".charCodeAt(0) - 'a'.charCodeAt(0) (97) => 0th index (0th index will have 'a' 's first occurrence)
    //"aabca".charCodeAt(3) - 'a'.charCodeAt(0) (97) => 2nd index (2nd index will have 'c' 's first occurrence)
    let index = s.charCodeAt(i) - 'a'.charCodeAt(0);
    first[index] = Math.min(first[index], i);
    last[index] = i;
  }
  //go through all characters
  for (let i = 0; i < 26; i++) {
    //if there are characters in b/w 2 'a' (subsequence is of length 3)
    if (last[i] - first[i] > 1) {
      //     for(let j = first[i] + 1; j < last[i]; j++)
      //         set.add(s[j]);
      //         result += set.size;
      //         set.clear();
      // }
      //don't include the first[i] and last[i] (get unique characters in between)
      //s.slice(first[i] + 1, last[i]) => get subsequence
      //new Set(s.slice(first[i] + 1, last[i])) => get unique chars in subsequence

      // console.log(s.slice(first[i] + 1, last[i]), new Set(s.slice(first[i] + 1, last[i])))
      const subseq = s.slice(first[i] + 1, last[i]);
      result += new Set(subseq).size;
    }
  }
  return result;
};

/*

The time complexity of this solution is O(n), where n is the length of the input string s. The space complexity is O(26), which simplifies to O(1), because the first and last arrays have a fixed size of 26 to store character positions.

*/
