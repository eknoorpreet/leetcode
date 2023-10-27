/*

Design an algorithm to encode a list of strings to a string.
The encoded string is then sent over the network and is decoded back to the original list of
strings.

Please implement encode and decode


Example 1

Input: ["lint","code","love","you"]
Output: ["lint","code","love","you"]
Explanation:
One possible encode method is: "lint:;code:;love:;you"

Example 2

Input: ["we", "say", ":", "yes"]
Output: ["we", "say", ":", "yes"]
Explanation:
One possible encode method is: "we:;say:;:::;yes"


*/

const encode = function (str) {
  let result = '';
  for (const s of str) {
    result += `${s.length}#${s}`;
  }
  return result;
};

// //TC: O(1)
const decode = function (str) {
  const result = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (str[j] !== '#') {
      j++;
    }
    const length = Number(str.slice(i, j));
    result.push(str.slice(j + 1, j + 1 + length));
    i = j + 1 + length;
  }
  return result;
};

console.log(encode(['lint', 'code', 'love', 'you']));
console.log(decode('4#lint4#code4#love3#you'));
console.log(encode(['we', 'say', ':', 'yes']));
console.log(decode('2#we3#say1#:3#yes'));
