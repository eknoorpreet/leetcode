/**
 * @param {string} s
 * @return {string}
 */

/*

The solution uses a greedy strategy by:

Counting the total number of 1s in a single pass through the input string.
Making locally optimal choices to construct the maximum odd binary number:

Place totalOnes - 1 1s at the most significant bits
Fill the middle with all available 0s
Place a single 1 at the least significant bit to ensure the number is odd

*/

const maximumOddBinaryNumber = function (s) {
  let oneCount = 0;
  for (let c of s) {
    if (c === '1') oneCount++;
  }
  const zeroCount = s.length - oneCount;
  return '1'.repeat(oneCount - 1) + '0'.repeat(zeroCount) + '1';
};

// TC: (n)
// SC: (n)
