/*

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);


Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"


Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000

*/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

/*

Pattern:

For numRows = 4, pattern repeats every 6 chars (2*(4-1))
For numRows = 3, pattern repeats every 4 chars (2*(3-1))

Count the steps:

Down movement (from 1st row to 4th row): 3 steps (not 4!) (4 - 1)
Up movement (from 4th row to 1st row): 3 steps (not 4!) (4 - 1)
Total = 3 + 3 = 6 steps = 2 * (4 - 1)

The key insight is:

We subtract 1 because we count STEPS, not positions
Going from position 1 to position 4 takes 3 steps
In general: n positions need (n - 1) steps

Then, these are the middle rows whose diagonal characters we have to catch
(No need for first or last row since no in-between characters)

Row 0: P     I     N    (no gap needed)
Row 1: A   L S   I G    (gap = 4)
Row 2: Y A   H R        (gap = 2)
Row 3: P     I          (no gap needed)

Row 1 (currRow = 1): gap = 4
  A → L: (1 → 5) gap = 4
  S → I: (7 → 11) gap = 4

Row 2 (currRow = 2): gap = 2
  Y → A: (2 → 4) gap = 2
  H → R: (8 → 10) gap = 2
To understand the formula:

At Row 1: need smaller gap than charsInSection
At Row 2: need even smaller gap
Pattern: gap reduces by 2 for each row down

Therefore:
charsInBetween = charsInSection - 2 * currRow

For numRows = 4 (charsInSection = 6):
Row 1: 6 - 2*1 = 4
Row 2: 6 - 2*2 = 2

*/

const convert = function (s, numRows) {
  // Known base case
  if (numRows == 1) return s;

  let result = '';
  // Represents the pattern repeat length - how many characters before the vertical alignment repeats.
  // It's essentially one vertical line plus one diagonal line.
  let charsInSection = 2 * (numRows - 1);

  for (let currRow = 0; currRow < numRows; currRow++) {
    let index = currRow;

    while (index < s.length) {
      result += s[index];

      // These are the middle rows whose diagonal characters we have to catch
      // No need for first or last row
      if (currRow != 0 && currRow != numRows - 1) {
        let charsInBetween = charsInSection - 2 * currRow;
        let secondIndex = index + charsInBetween;

        if (secondIndex < s.length) {
          result += s[secondIndex];
        }
      }
      // Jump to same row's first character of next section.
      index += charsInSection;
    }
  }

  return result;
};

/*

Time Complexity: O(n) where n is length of input string

We iterate over each index of the input only once and perform constant work at each index.

Space complexity: O(1)

*/
