/*

Seven different symbols represent Roman numerals with the following values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).
Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
Given an integer, convert it to a Roman numeral.



Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV


Constraints:

1 <= num <= 3999

*/

/**
 * @param {number} num
 * @return {string}
 */

// A list instead of a hashmap because we need to access it in a specific order
// (highest to lowest)
const intToRomanList = [
  ['I', 1],
  ['IV', 4],
  ['V', 5],
  ['IX', 9],
  ['X', 10],
  ['XL', 40],
  ['L', 50],
  ['XC', 90],
  ['C', 100],
  ['CD', 400],
  ['D', 500],
  ['CM', 900],
  ['M', 1000],
];

const intToRoman = function (num) {
  let result = '';

  // Create a new array instead of mutating the original array
  // intToRomanList.reverse() will reverse it in 1st iteration,
  // then reverse it gain to original array in 2 iteration, and so on...
  const intToRomanListReversed = [...intToRomanList].reverse();
  // iterate from the largest values
  for (let [roman, integer] of intToRomanListReversed) {
    const count = Math.floor(num / integer);
    // num = 3749, integer = 1000 => how many times can 1000 (M) go into 3749
    // => 3 times => MMM
    if (count) {
      result += roman.repeat(count);
      // remaning num = 749
      num = num % integer;
    }
  }
  return result;
};

/*

Time Complexity: O(1)

Creating reversed array: O(1)

[...intToRomanList].reverse() is O(1) because intToRomanList has a fixed size of 13 elements

Main loop: O(1)

The loop always iterates exactly 13 times (fixed length of intToRomanList)
For each iteration:

Math.floor(): O(1)
roman.repeat(count): While this looks like it could be O(n), it's actually O(1) because:

The maximum value of count is bounded by the largest possible input/smallest roman numeral value
Given constraints of Roman numerals (typically ≤ 3999), the maximum count would be 3 for M (1000)


String concatenation: O(1) for each operation as we're adding a bounded number of characters


Space Complexity: O(1)

Fixed extra space:

New reversed array: O(1) (13 elements)

Output string space:

While result grows as we build the Roman numeral, its maximum length is bounded
For any valid Roman numeral ≤ 3999, the result will never exceed 15 characters
Therefore, string space is O(1)

*/
