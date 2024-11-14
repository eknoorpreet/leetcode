/*

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100

*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/*

Brute Force

Find out every possible permutation of list formed by the elements of the given array and
find out the permutation which is just larger than the given one.
But this one will be a very naive approach, since it requires us to find out every
possible permutation which will take really long time and the implementation is complex.
Thus, this approach is not acceptable at all. Hence, we move on directly to the correct approach.

Complexity Analysis

Time complexity : O(n!). Total possible permutations is n!.
Space complexity : O(n). Since an array will be used to store the permutations.

Optimal:

Consider [1, 2, 3, 4, 5], Next permutation = [1, 2, 3, 5, 4]

Note: We started from the right and tried to find a number (4) to be replaced with its immediately
greater number (5)

The Key Intuition:

To find the next permutation, we need to find a way to increase the overall number while keeping the
increase as small as possible.
We should try to modify the rightmost elements possible since they represent smaller changes
in value (lesser significant positions in the right)

Why look for descending order from right?

[2, 3, 6, 5, 4, 1]
         ↓  ↓  ↓  ↓
         These are descending

A sequence in descending order represents the largest possible permutation of those digits
If the entire array is descending (like [9,5,4,3,1]), it means we've reached the largest possible permutation
Any change to a descending sequence can only make it smaller.

Why find the first pair where a[i - 1] < a[i] from right?

[2, 3, 6, 5, 4, 1]
      ^  ^
      3  6  Here 3 < 6

This point represents the first opportunity to make the number larger
Everything to the right of this position is in descending order (largest possible arrangement)
Therefore, this is the rightmost position where we can make a meaningful change


Why can't rearrangements to the right create a larger number?

[2, 3, 6, 5, 4, 1]
         5, 4, 1 is descending

If a sequence is in descending order, any rearrangement will make it smaller
This is because descending order is the largest possible arrangement of those digits
For example, 541 is larger than any other arrangement of these digits (514, 451, etc.)

Why replace with the next larger number?

[2, 3, 6, 5, 4, 1]
      ^
      3 needs to be replaced with 4

We want the next larger permutation, not any larger permutation
By choosing the smallest number that's still larger than our target
We ensure we get the next number in lexicographical order
If we chose a larger number, we'd skip some permutations

Consider the array [1, 5, 8, 4, 7, 6, 5, 3, 1]

Step 1: Find the first decreasing element from the right
[1, 5, 8, 4, 7, 6, 5, 3, 1]
            ^
            4 (i)

Going from right to left, find the first number that is smaller than its next number
In the code: while(i >= 0 && nums[i + 1] <= nums[i]) i--
We find 4 because 4 < 7

Step 2: Find the smallest number on the right that's greater than the number we found
[1, 5, 8, 4, 7, 6, 5, 3, 1]
            ^     ^
            4     5

In the code: while(nums[j] <= nums[i]) j--
We find 5 because it's the smallest number greater than 4 in the right portion

The reverse(nums, i + 1) step is crucial for getting the lexicographically next permutation. Let me explain why:
Consider our previous example: [2, 3, 6, 5, 4, 1]
After we find our swap position and perform the swap with the next larger number:

[2, 3, 6, 5, 4, 1] (original)
[2, 4, 6, 5, 3, 1] (after swap)
         ↓ ↓ ↓ ↓
         These need reversing

Why Reverse?

After the swap, all numbers to the right of our swap position are still in descending order
However, we want the next lexicographically larger permutation
The lexicographically smallest arrangement of any set of numbers is ascending order
Therefore, to get the next permutation, we need these numbers in ascending order

[2, 4, 6, 5, 3, 1]  (after swap)
[2, 4, 1, 3, 5, 6]  (after reverse)
         ↑ ↑ ↑ ↑
         Reversed this portion

*/

const reverse = (nums, start) => {
  let i = start;
  let j = nums.length - 1;
  while (i < j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
    i++;
    j--;
  }
};

const nextPermutation = function (nums) {
  let i = nums.length - 2;
  // Search for the first decreasing element from the right
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }
  if (i >= 0) {
    let j = nums.length - 1;
    // Search for the smallest element larger than nums[i]
    while (nums[j] <= nums[i]) {
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // The entire array was in decreasing order, therefore no larger permutation possible
  // Reverse the entire array
  reverse(nums, i + 1);
};

/*

Time complexity: O(n)

The first while loop runs at most n iterations, decrementing the variable i as it searches for the first decreasing element from the right. In the worst case, it checks all elements, so it takes O(n) time.

The second while loop also runs at most n iterations, decrementing the variable j as it searches for the smallest element larger than nums[i]. Similarly, it can take O(n) time.

The reverse function is called on a portion of the array, from index i + 1 to the end. In the worst case, this can cover the entire array, leading to a time complexity of O(n).

The swap function runs in constant time, O(1), since it only exchanges two elements.

Therefore, the overall time complexity is O(n).

Space complexity: O(1)

The built-in swap and reverse functions do not require additional space beyond what is already present in the input array.

Hence, the space complexity is O(1).

*/
