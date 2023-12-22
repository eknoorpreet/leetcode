/*

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 105.



Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"
Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"
Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"


Constraints:

1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].

*/

/**
 * @param {string} s
 * @return {string}
 */

const decodeString0 = function (s) {
  const stack = [];
  let result = '';
  let currStr = ''; //inside []
  let k = 0; //outside []
  // let sArr = s.split(/\[|\]/g).filter(c => c !== "")
  //['3', 'a', '2', 'bc']
  for (let c of s) {
    if (c === '[') {
      stack.push([currStr, k]);
      currStr = '';
      k = 0;
    } else if (c === ']') {
      const [prevStr, prevK] = stack.pop();
      currStr = prevStr + prevStr.repeat(prevK);
    } else if (!isNaN(c)) {
      //push integer to stack
      k = k * 10 + parseInt(c);
    } else currStr += c;
  }
  return currStr;
};

const decodeString = function (s) {
  const stack = [];
  let result = '';
  let currStr = ''; //inside []
  let k = 0; //outside []
  // let sArr = s.split(/\[|\]/g).filter(c => c !== "")
  //['3', 'a', '2', 'bc']
  for (let c of s) {
    // if curr char is not a closing bracket => push to stack (even opening [)
    if (c !== ']') {
      stack.push(c);
    } else {
      let enclosedStr = '';
      // When you encounter a closing bracket, start popping!
      // Until you reach its opening counterpart
      while (stack.at(-1) !== '[') {
        // Build the string
        enclosedStr = stack.pop() + enclosedStr;
      }
      stack.pop(); // Pop the opening bracket

      // The string is built. Now, get the integer
      let k = '';
      // While stack is non-empty and the curr char is a number
      while (stack.length && !isNaN(stack.at(-1))) {
        // Build the integer
        k = stack.pop() + k;
      }
      // Push the resulting string to the stack
      stack.push(enclosedStr.repeat(parseInt(k)));
    }
  }
  return stack.join('');
};

//TC: O(n)
//SC: O(n)
