/*

You are given a positive integer num consisting of exactly four digits. Split num into two new integers new1 and new2 by using the digits found in num. Leading zeros are allowed in new1 and new2, and all the digits found in num must be used.

For example, given num = 2932, you have the following digits: two 2's, one 9 and one 3. Some of the possible pairs [new1, new2] are [22, 93], [23, 92], [223, 9] and [2, 329].
Return the minimum possible sum of new1 and new2.

Example 1:

Input: num = 2932
Output: 52
Explanation: Some possible pairs [new1, new2] are [29, 23], [223, 9], etc.
The minimum sum can be obtained by the pair [29, 23]: 29 + 23 = 52.
Example 2:

Input: num = 4009
Output: 13
Explanation: Some possible pairs [new1, new2] are [0, 49], [490, 0], etc.
The minimum sum can be obtained by the pair [4, 9]: 4 + 9 = 13.


Constraints:

1000 <= num <= 9999

*/

/**
 * @param {number} num
 * @return {number}
 */

const minimumSum0 = (num) => {
  //sort the digits in descending order
  const numStr = num
    .toString()
    .split('')
    .sort((a, b) => b - a);
  const n = numStr.length;
  let res = 0;
  let evenIteration = false;
  let position = 0;

  for (let i = 0; i < n; i++) {
    //the largest digit amounts to the smallest number (9 x 10^0 = 9)
    res += parseInt(numStr[i]) * Math.pow(10, position);
    if (evenIteration) {
      position++;
      evenIteration = false;
    } else {
      evenIteration = true;
    }
  }

  return res;
};

const minimumSum = (num) => {
  //sort in ascending order
  const numStr = [...`${num}`].sort();

  // If we choose num1 with numStr[0] and numStr[1], that means num2 = numStr[2] + numStr[3]]
  // This means that num2 is a big sum than it needs to be (since it's the sum of the buggesr numbers)
  // Hence, smallest digit from num1 is at numStr[0] and num2 is at numStr[2]
  // Bigger digit from num1 is at numStr[1] and num2 is at numStr[2]
  const num1 = numStr[0] + numStr[2];
  const num2 = numStr[1] + numStr[3];
  return parseInt(num1) + parseInt(num2);
};
