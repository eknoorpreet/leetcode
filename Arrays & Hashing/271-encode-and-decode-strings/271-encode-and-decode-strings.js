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

/*

["lint","code"] ->  "4#lint4#code"
                     ↑    ↑  ↑    ↑
                     |    |  |    |
                  length  |  length|
                       string   string

*/

const encode = function (str) {
  let result = '';
  for (const s of str) {
    // Format: length#string
    result += `${s.length}#${s}`;
  }
  return result;
};

/*

Input: "4#lint4#code"

1st iteration:
i = 0, find '#' at j = 1
length = 4
extract "lint"
i moves to start of next segment

2nd iteration:
i = 6, find '#' at j = 7
length = 4
extract "code"

The # delimiter separates the length from the string
Length helps us know exactly where each string ends
No string content can interfere with our encoding because:

Length is always a number
'#' is our unique delimiter
We use length to extract exact string content

*/

//TC: O(1)
const decode = function (str) {
  const result = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    // Find the # delimiter
    while (str[j] !== '#') {
      j++;
    }
    // Extract length and string
    const length = Number(str.slice(i, j));
    const word = str.slice(j + 1, j + 1 + length);
    result.push(word);
    // Move on to the next string
    i = j + 1 + length;
  }
  return result;
};

/*

Time & Space Complexity:


Encode:

Time: O(n), where n is total length of all strings
Space: O(1) excluding output


Decode:

Time: O(n)
Space: O(1) excluding output

*/

console.log(encode(['lint', 'code', 'love', 'you']));
console.log(decode('4#lint4#code4#love3#you'));
console.log(encode(['we', 'say', ':', 'yes']));
console.log(decode('2#we3#say1#:3#yes'));
