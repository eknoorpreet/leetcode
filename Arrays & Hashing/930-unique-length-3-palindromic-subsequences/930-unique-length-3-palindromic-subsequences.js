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

/*

Palindrome of length 3: "aca", "aba". Basically, first and last characters need to be the same.

Key Insight:

For a length-3 palindrome, first and last characters must be the same
Middle character can be any unique character between first and last occurrences

We track the first and last occurence of each character.

Then, for each character, we count *unique* characters between its first and last occurence.
That is the number of palindromes with that character in the first and last positions.

Example: "abcbba", we have two unique chars between first and last a (c and b) resulting in:
"aba"
"aca"

and two - between first and last b (b and c) resulting in:
"bbb"
"bcb"

No characters in between c so it forms no palindromes.

Ex:

Copys = "aabca"

Step 1: Track first/last occurrences
first['a'] = 0  // First 'a' at index 0
last['a'] = 4   // Last 'a' at index 4
first['b'] = 1  // First 'b' at index 1
last['b'] = 1   // Last 'b' at index 1
first['c'] = 3  // First 'c' at index 3
last['c'] = 3   // Last 'c' at index 3

Step 2: For each character
'a': slice(1,4) = "abc" -> unique chars = ["b","c"] -> 2 palindromes
'b': No gap between first/last -> 0 palindromes
'c': No gap between first/last -> 0 palindromes

Total = 2 palindromes

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
  const firstOccurences = Array(26).fill(Number.MAX_VALUE);
  const lastOccurences = Array(26);
  for (let i = 0; i < s.length; i++) {
    //"aabca".charCodeAt(0) - 'a'.charCodeAt(0) (97)
    // => 0th index (0th index will have 'a' 's first occurrence)

    //"aabca".charCodeAt(3) - 'a'.charCodeAt(0) (97)
    // => 2nd index (2nd index will have 'c' 's first occurrence)
    // let index = s.charCodeAt(i) - 'a'.charCodeAt(0)

    // Similarly, 'a'.charCodeAt() - 97 => 0
    const index = s[i].charCodeAt() - 97;
    firstOccurences[index] = Math.min(firstOccurences[index], i);
    lastOccurences[index] = i;
  }
  // Go through all characters
  for (let i = 0; i < 26; i++) {
    const set = new Set();
    if (lastOccurences[i] - firstOccurences[i] > 1) {
      //don't include the first[i] and last[i] (get unique characters in between)
      const uniquePalindromicLetters = new Set(
        s.slice(firstOccurences[i] + 1, lastOccurences[i])
      );
      result += uniquePalindromicLetters.size;
    }
  }
  return result;
};

/*

The time complexity of this solution is O(n), where n is the length of the input string s.
The space complexity is O(26), which simplifies to O(1), because the first and last arrays have a fixed size of 26 to store character positions.

*/
