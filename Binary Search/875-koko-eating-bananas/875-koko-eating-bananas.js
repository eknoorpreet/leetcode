/*

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.



Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23

Constraints:

1 <= piles.length <= 10^4
piles.length <= h <= 10^9
1 <= piles[i] <= 10^9

*/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */

const isJobPossible = (arr, mid, h) => {
  let hoursCount = 0;
  for (const bananas of arr) {
    // time = distance / speed
    hoursCount += Math.ceil(bananas / mid);
  }
  return hoursCount <= h;
};

const minEatingSpeed = function (piles, h) {
  // [3,6,7,11], h = 8
  let low = 1; // 1 bananas/hr
  let high = 0;
  let result = 1;
  for (const bananas of piles) {
    // "If the pile has less than k bananas, she eats all of them instead and will
    // not eat any more bananas during this hour."
    // Therefore, we don't set 'high' (potential k) to the sum of all bananas!
    // Because if a pile has < k bananas, it'll only eat that many and won't move
    // to the next pile.
    high = Math.max(high, bananas); // 11 bananass/hr
  }
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2); // 6 bananass/hr
    if (isJobPossible(piles, mid, h)) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return result;
};

/*

The time complexity of the given code is O(n * log(m)), where n is the length of the piles array,
and m is the maximum pile size. The space complexity is O(1).

*/
