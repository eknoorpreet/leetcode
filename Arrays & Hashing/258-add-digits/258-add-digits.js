/*

Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.

Example 1:

Input: num = 38
Output: 2
Explanation: The process is
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2
Since 2 has only one digit, return it.
Example 2:

Input: num = 0
Output: 0

Constraints:

0 <= num <= 2^31 - 1

Follow up: Could you do it without any loop/recursion in O(1) runtime?

*/

/**
 * @param {number} num
 * @return {number}
 */

// const addDigits0 = function(num) {
//     while (num >= 10) {
//         let digitSum = 0;
//         while (num > 0) {
//             digitSum += num % 10;
//             num = Math.floor(num / 10);
//         }
//         //the number has been exhausted, now operate on its digitSum
//         num = digitSum;
//     }
//     return num;
// };

const addDigits0 = function (num) {
  while (num >= 10) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
};

const addDigits1 = function (num) {
  if (num < 10) return num;

  let digitSum = 0;
  while (num > 0) {
    digitSum += num % 10;
    num = Math.floor(num / 10);
  }

  //the number has been exhausted, now operate on its digitSum
  return addDigits(digitSum);
};

/*

The time and space complexity for both the iterative and recursive solutions of the function
is the same.

Time Complexity: The time complexity for both solutions is O(log10(num)) because in each
iteration (whether it's a loop or a recursive call), we reduce the value of num by a factor of 10
by continuously summing its digits. The number of iterations required to reduce num to a
single-digit number is logarithmic in the value of num.

Space Complexity: The space complexity for both solutions is O(1) because they don't use any
data structures that grow with the input size. The space required is constant, as it doesn't
depend on the value of num.

*/

const addDigits = function (num) {
  //if number = 0, sum of digits = 0
  if (num === 0) return 0;
  //if num is divisible by 9
  else if (num % 9 === 0) return 9;
  else return num % 9;
};

/*

To check if a number is divisible by 9, add the digits of the number and check if the sum is divisible by 9 or not. If the sum is divisible by 9, then the number is divisible by 9, otherwise, it's not.

Now if you notice if a number is divisible by 9(and 3), then if we follow the procedure as mention in the question (sum of digits of every previous num) , we would always find the new_num(the sum of the digits ) to be divisible by 9(and 3).

Basically, the solution is based on the property that the digital root (also called the repeated digital sum) of any number divisible by 9 is 9, and for numbers not divisible by 9, the digital root is equal to the remainder when the number is divided by 9.

The function exploits this property to compute the digital root, which is the repeated sum of digits until only one digit is left.

Here's a quick explanation of the property:

The digital root of 9 is 9.
The digital root of 18 (1 + 8) is 9.
The digital root of 27 (2 + 7) is 9.
The digital root of 36 (3 + 6) is 9.
And so on.

For numbers not divisible by 9:

The digital root of 38 (3 + 8) is 38 % 9 = 2.
The digital root of 55 (5 + 5) is 55 % 9 = 1.
The digital root of 62 (6 + 2) is 62 % 9 = 8.
And so on.
This property simplifies the calculation of the digital root, and the given function leverages it to compute the result efficiently.

The solution has a time complexity of O(1) because it performs a small number of operations regardless of the input value.

*/
