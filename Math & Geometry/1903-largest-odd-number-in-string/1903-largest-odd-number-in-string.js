/*

You are given a string num, representing a large integer. Return the largest-valued odd integer (as a string) that is a non-empty substring of num, or an empty string "" if no odd integer exists.

A substring is a contiguous sequence of characters within a string.



Example 1:

Input: num = "52"
Output: "5"
Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.
Example 2:

Input: num = "4206"
Output: ""
Explanation: There are no odd numbers in "4206".
Example 3:

Input: num = "35427"
Output: "35427"
Explanation: "35427" is already an odd number.


Constraints:

1 <= num.length <= 10^5
num only consists of digits and does not contain any leading zeros.

*/

/**
 * @param {string} num
 * @return {string}
 */

/*

Fails for large numbers because w're trying to convert a very large string of digits into a JavaScript number and JavaScript numbers (even BigInt) have limitations in size

const largestOddNumber = function(num) {
    for(let i = num.length - 1; i >= 0; i--) {
        if(parseInt(num.substring(0, i + 1)) % 2 === 1) return num.substring(0, i + 1)
    }
    return ""
};

Time: O(n²) because:

Outer loop runs O(n) times
Each iteration creates a substring of length up to n, which is O(n)
So total is O(n * n) = O(n²)

Space: O(n) because:

Each substring operation creates a new string
The largest substring could be length n

*/

/*

Key insight: To check if a number is odd, you only need to look at its last digit!
We only check if the last digit is odd.
If we find an odd digit, everything to its left forms our largest odd number

*/

const largestOddNumber = function (num) {
  for (let i = num.length - 1; i >= 0; i--) {
    if (parseInt(num[i]) % 2 === 1) return num.substring(0, i + 1);
  }
  return '';
};

/*

Time: O(n) because:

Single pass through the string from right to left
Each operation (checking if digit is odd) is O(1)
We might need to check all digits in worst case

Space: O(1) because:

We're only accessing single digits at a time in the loop
The final substring is not counted in space complexity as it's part of the output
We only use a constant amount of extra space regardless of input size

*/
