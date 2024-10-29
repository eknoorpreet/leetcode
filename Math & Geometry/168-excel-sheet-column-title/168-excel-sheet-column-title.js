/*

Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

For example:

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...


Example 1:

Input: columnNumber = 1
Output: "A"
Example 2:

Input: columnNumber = 28
Output: "AB"
Example 3:

Input: columnNumber = 701
Output: "ZY"


Constraints:

1 <= columnNumber <= 2^31 - 1

*/

/**
 * @param {number} columnNumber
 * @return {string}
 */

/*

Think of our base 10 number system: We go from 1 - 10, then 11 - 20...
Once the rightmost digit has run from 1 - 0, we then move on to the left digit and increment it. Basically, each position runs from 1 - 10.

This problem is the same, except that it runs from A - Z (26 letters).
Basically, each position runs from A - Z (26).

So, this problem is about transitioning from base 10 to base 26.

Think about how we write numbers in base 10 (decimal). For example, let's break down 123:
123 = 1×100 + 2×10 + 3×1
    = 1×10² + 2×10¹ + 3×10⁰
When we want to extract each digit from 123:

123 % 10 = 3 (rightmost digit)
123 ÷ 10 = 12 (remaining digits)
12 % 10 = 2 (next digit)
12 ÷ 10 = 1 (remaining digit)
1 % 10 = 1 (last digit)

This is exactly what we're doing with base 26, just using 26 instead of 10!
Let's convert 2002 to base 26 ("BXZ"):
1) 2002 - 1 = 2001  (subtract 1 for Excel's 1-based system)
   2001 % 26 = 25   ('Z')
   2001 ÷ 26 = 76   (remaining value to process)

2) 76 - 1 = 75
   75 % 26 = 23     ('X')
   75 ÷ 26 = 2      (remaining value)

3) 2 - 1 = 1
   1 % 26 = 1       ('B')
   1 ÷ 26 = 0       (done)
To really see the pattern, let's write 2002 in powers of 26:
2002 = 2×26² + 24×26¹ + 26×26⁰
     = 2×676 + 24×26 + 26×1
     = 1352 + 624 + 26
     = 2002
So:

Modulo (%) gives us the remainder, which becomes our current digit/letter
Division (÷) gives us the next number to process, which contains the remaining digits/letters

In base 10:
123 ÷ 10 = 12 remainder 3
           └─ next digits  └─ current digit

In base 26:
2002 ÷ 26 = 76 remainder 25
            └─ next letters └─ current letter ('Z')

But the catch is that in a base 26 system, the numbers would start from 0 as in {0 => A, 1 => B...} but in this problem, we have the number starting from 1, not 0

Therefore, we need to subtract 1 before each operation to compensate for this "+1" offset in the Excel system.

*/

const convertToTitle = function (columnNumber) {
  let result = '';

  while (columnNumber > 0) {
    // Subtract 1 from columnNumber first because Excel column titles
    // are 1-based but we need 0-based for calculation
    // (since String.fromCharCode(65 + 0) => 'A')
    columnNumber--;

    // Get remainder when divided by 26 (0-25)
    // Add 65 to get ASCII code for 'A'-'Z'

    // columnNumber = 28 - 1 => 27 % 26 = 1 => 'B'
    const char = String.fromCharCode(65 + (columnNumber % 26));

    // Add the character to the beginning of result
    result = char + result;

    // Integer division by 26 for next iteration
    columnNumber = Math.floor(columnNumber / 26);
  }
  return result;
};

/*

Time complexity: O(logN)

The number of operations would be equal to the number of while loop iterations. In each iteration, the number N gets divided by 26. Hence the time complexity would be O(log
26 N).

Space complexity: O(1)

We only need one string to store the output, but generally the space to store the output is not considered as part of space complexity and hence the space complexity is constant.

*/
