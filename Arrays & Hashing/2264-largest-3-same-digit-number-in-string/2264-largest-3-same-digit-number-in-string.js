/*

You are given a string num representing a large integer. An integer is good if it meets the following conditions:

It is a substring of num with length 3.
It consists of only one unique digit.
Return the maximum good integer as a string or an empty string "" if no such integer exists.

Note:

A substring is a contiguous sequence of characters within a string.
There may be leading zeroes in num or a good integer.


Example 1:

Input: num = "6777133339"
Output: "777"
Explanation: There are two distinct good integers: "777" and "333".
"777" is the largest, so we return "777".
Example 2:

Input: num = "2300019"
Output: "000"
Explanation: "000" is the only good integer.
Example 3:

Input: num = "42352338"
Output: ""
Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.


Constraints:

3 <= num.length <= 1000
num only consists of digits.

*/

/**
 * @param {string} num
 * @return {string}
 */

const largestGoodInteger0 = function (num) {
  let maxStr = '';
  let currStr = num[0];
  for (let i = 1; i < num.length; i++) {
    if (num[i] === num[i - 1] && currStr.length <= 3) {
      currStr += num[i];
      if (currStr.length === 3) {
        maxStr = Number(currStr) >= Number(maxStr) ? currStr : maxStr;
      }
    } else {
      currLength = 1;
      currStr = num[i];
    }
  }
  return maxStr;
};

const largestGoodInteger = function (num) {
  let maxStr = '';
  let currLength = 1;

  for (let i = 1; i < num.length; i++) {
    if (num[i] === num[i - 1]) {
      currLength++;
      if (currLength === 3) {
        const currStr = num[i] + num[i - 1] + num[i - 2];
        maxStr = Number(currStr) >= Number(maxStr) ? currStr : maxStr;
      }
    } else {
      currLength = 1;
    }
  }
  return maxStr;
};

/*

TC: O(n)
SC: O(1)

*/
