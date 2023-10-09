/*

Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal
substring
 consisting of non-space characters only.



Example 1:

Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:

Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
Example 3:

Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.


Constraints:

1 <= s.length <= 104
s consists of only English letters and spaces ' '.
There will be at least one word in s.

*/

/**
 * @param {string} s
 * @return {number}
 */

//TC: O(n)
//SC: O(n)
const lengthOfLastWord1 = function (s) {
  const arr = s.split(' ');
  return arr[arr.length - 1].length;
};

//TC: O(n)
//SC: O(n)

//If we traverse the string in reverse, start counting and hit a " ", stop counting.
//TC:  O(n)
//SC:  O(1)
const lengthOfLastWord2 = function (s) {
  let count = 0;
  s = s.trim();
  // if (s.length === 1) return 1;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ' ') return count;
    count++;
    if (i === 0) return count;
  }
};

//Using no built-in methods
//TC:  O(n)
//SC:  O(1)
const lengthOfLastWord = function (s) {
  let count = 0;
  // s = s.trim();
  let letterEncountered = false;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      //we only start counting when we see a letter
      letterEncountered = true;
      count++;
    }
    //letter encountered and we see a break OR no space encountered but string
    //finished (just 1 word in string) => word finished => return length
    if ((letterEncountered && s[i] === ' ') || i === 0) return count;
  }
};

console.log(lengthOfLastWord('Hello World')); //expected: 5
console.log(lengthOfLastWord('   fly me   to   the moon  ')); //expected: 4
console.log(lengthOfLastWord('a')); //1
console.log(lengthOfLastWord('    day')); //expected: 3
