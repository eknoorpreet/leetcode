/*

Given an array of integers arr of even length n and an integer k.

We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.

Return true If you can find a way to do that or false otherwise.



Example 1:

Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
Example 2:

Input: arr = [1,2,3,4,5,6], k = 7
Output: true
Explanation: Pairs are (1,6),(2,5) and(3,4).
Example 3:

Input: arr = [1,2,3,4,5,6], k = 10
Output: false
Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.


Constraints:

arr.length == n
1 <= n <= 10^5
n is even.
-10^9 <= arr[i] <= 10^9
1 <= k <= 10^5

*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */

/*

When we sort the array by these modulo values, all pairs will be located at opposite ends.
Ex: After pairing elements with modulo 0, elements with modulo 1 will pair with those at k - 1, which are at the end of the array since modulo values range from 0 to k - 1.

Use 2-pointers

*/

const canArrange0 = function (arr, k) {
  // Sort the array in the (ascending) order of the remainders
  // [5, 10, 1, 6, 2, 7,  3, 8, 4, 9]
  arr.sort((a, b) => (((a % k) + k) % k) - (((b % k) + k) % k));

  let left = 0;
  let right = arr.length - 1;

  // First, dela with mod 0s
  while (left < right) {
    // If curr el is not divisible by k (mod !== 0)
    // => All mod 0s have been dealt with, terminate!
    if (arr[left] % k !== 0) break;
    // If curr el is divisible by k, check the next one.
    // If not, they don't make a pair => false
    if (arr[left + 1] % k !== 0) return false;

    // skip to the next 2
    left = left + 2;
  }

  // Deal with non-0 remainders
  while (left < right) {
    if ((arr[left] + arr[right]) % k !== 0) return false;
    left++;
    right--;
  }
  return true;
};

/*

Time complexity: O(n⋅logn)

Space complexity: O(n) or O(logn).

*/

/*

(a + b) % k = 0

= (modA + modB) % k = 0

= (modA + modB) = n * k, where n is an integer

= O <= modA <= k - 1

= O <= modB <= k - 1

Therefore,

0 <= modA + modB <= 2k - 2

= 0 <= n * k <= 2k - 2

Since k is +ve, n must be less than 2

= 0 <= n < 2 => n = 1

Therefore,

modA + modB = k

modB = k - modA

modB = k - 0 = k

If a is fully divisible by k (modA = 0), we need to pair this element with a B such that modB is also 0. This is because the sum of two numbers divisible by k is also divisible by k. Therefore, the count of elements that yield a remainder of 0 must be even to form valid pairs.

If a is not divisible by k (modA !== 0), we need to pair this element with a B such that
modA + modB = k. Element with remainder 1 implies that it needs a 1 to be added to it to be fully divisible by k. Therefore, it needs to pair with an element with remainder k - 1 = 4.
Elements with remainder 2 needs to pair with an element with remainder k - 2 = 3

Track the remainders (and their frequencies) via a hashmap called remainderCount


*/

const canArrange1 = function (arr, k) {
  // track remainders and their frequencies
  const remainderCount = new Map();
  for (const num of arr) {
    // handle both positive and negative values
    // ensures the remainder rem always falls within the range [0, k - 1],
    // regardless of whether num is positive or negative.
    const rem = ((num % k) + k) % k;
    remainderCount.set(rem, (remainderCount.get(rem) || 0) + 1);
  }

  for (const num of arr) {
    const rem = ((num % k) + k) % k;
    // If the curr element A is fully divisible by k
    if (rem === 0) {
      // Check its frequency in the map
      // Is it odd? => There's at least one that does not form a pair
      // Total pairs !== n / 2 => false
      if (remainderCount.get(rem) % 2 !== 0) return false;
    }
    // For other remainders:
    // If frequency of modA and modB (= k - modA) are not the same => false
    else if (remainderCount.get(rem) !== remainderCount.get(k - rem))
      return false;
  }
  // Else, return true
  return true;
};

/*

Time complexity: O(n)

The loop traverses the array twice, and all search, insert operations performed on the hashmap take constant time. Therefore, the time complexity is linear.

Space complexity: O(k)

Inserting the modulo values in the hashmap requires exactly k unique values from 0 to k-1, so the space complexity is given by O(k).

*/
