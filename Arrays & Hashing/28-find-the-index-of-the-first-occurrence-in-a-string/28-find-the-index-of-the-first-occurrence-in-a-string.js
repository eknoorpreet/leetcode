/*

Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.



Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.


Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.

*/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

const strStr1 = function (haystack, needle) {
  return haystack.indexOf(needle);
};

const strStr0 = function (haystack, needle) {
  if (!needle.length) return 0;
  // do we need to go throught the entire haystack?
  // we can optimize: reduce the area to cover by subtracting needle.length from
  // haystack.length as we only want the first/starting index
  // => only check "sadbut" BUT wait! We want to include the starting index
  // => haystack.length - needle.length + 1
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    for (let j = 0; j < needle.length; j++) {
      // different characters => break! (-1)
      if (haystack[i + j] !== needle[j]) break;
      console.log(i, j, haystack[i + j], needle[j]);
      // same characters AND we exhausted 'needle' => return i
      // else, continue on to the next iteration
      if (j === needle.length - 1) return i;
    }
  }
  return -1;
};

const strStr = function (haystack, needle) {
  //edge case: needle = "" => 0
  if (!needle.length) return 0;
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }
  //needle doesn't exist in haystack
  return -1;
};

/*

Time Complexity (TC): O((n-m+1) * m)

n is the length of the "haystack" string, and m is the length of the "needle" string.
The loop runs from 0 to haystack.length - needle.length, which is roughly n - m iterations.
Within each iteration, the code compares the substring of "haystack" with "needle" using haystack.slice(i, i + needle.length) === needle, which takes O(m) time.
As a result, the overall time complexity is O((n-m+1) * m), where n-m+1 is the number of iterations.

Space Complexity (SC): O(1)



*/
