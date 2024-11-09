/*

Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.



Example 1:

Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following sequence:
push(1), push(2), push(3), push(4),
pop() -> 4,
push(5),
pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

Example 2:

Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.


Constraints:

1 <= pushed.length <= 1000
0 <= pushed[i] <= 1000
All the elements of pushed are unique.
popped.length == pushed.length
popped is a permutation of pushed.

*/

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */

const validateStackSequences0 = function (pushed, popped) {
  const stack = [];
  let i = 0;
  for (const num of pushed) {
    // Push the current element onto the stack
    stack.push(num);
    // Whenever the last element in the (non-empty) stack is equal to the current element in the popped, we increase the counter (checking for valid pop operations).
    while (i < popped.length && stack.length && popped[i] === stack.at(-1)) {
      stack.pop();
      i++;
    }
  }
  return !stack.length;
};

//TC: O(n)
//SC: O(n)

/*

Optimization: Use the pushed array as a stack to simulate the stack operations.

Same Intuition:

We can simulate the actual stack operations to verify if the sequence is valid
NEW: We'll use the pushed array itself as our stack to save space
As we push elements, we'll check if we can perform any pop operations that match our target sequence


*/

const validateStackSequences = (pushed, popped) => {
  let i = 0; // Initialize one pointer pointing to the pushed array
  let j = 0; // Initialize one pointer pointing to the popped array

  for (const val of pushed) {
    pushed[i++] = val; // Using pushed as the stack.
    // While we can match pops, simulate them
    // Pop as many elements as possible whenever they match the required sequence

    // Since we just incremented i above, we'll check the prev element (i - 1)
    // Was the [i - 1] in pushed the same as j in popped
    while (i > 0 && pushed[i - 1] === popped[j]) {
      // pushed[i - 1] values equal to popped[j];
      i--; // Simulate pop by moving stack pointer back
      j++; // Move to next value we need to pop
    }
  }
  // We know the sequence is invalid if we can't empty the stack by the end
  // Since pushed is a permutation of popped,
  // So at the end, we are supposed to be left with an empty stack
  return i === 0;
};
/*

Time Complexity: O(n) where n is the length of the arrays
Space Complexity: O(1) since we're reusing the input array as our stack

*/
