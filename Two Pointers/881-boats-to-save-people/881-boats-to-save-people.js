/*

You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.

Return the minimum number of boats to carry every given person.



Example 1:

Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
Example 2:

Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)
Example 3:

Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)


Constraints:

1 <= people.length <= 5 * 10^4
1 <= people[i] <= limit <= 3 * 10^4

*/

/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */

//wrong approach
// var numRescueBoats = function(people, limit) {
//     //in order to minimize boats needed => we need to maximize people carried
//     //let's try to aim for maximum people by starting with least heavy people
//     people.sort((a, b) => a - b)
//     let totalWeight = 0;
//     let result = 1;
//     for(let i = 0; i < people.length; i++) {
//         if(totalWeight + people[i] <= limit) {
//             totalWeight += people[i]
//         } else {
//             result++
//             totalWeight = people[i]
//         }
//     }
//     return result
// };

/*

Greedy appraoch: Pick the person with higher weight. Why? Well, what if we pick weight = 4, limit is 10 and the choice is b/w [1, 6, 9]. If we pair 4 with 1, we will need separate boats for 6 and 9 (total = 3). But if we pair 4 with 6, we will be able to pair 1 with 9 (total = 2)

*/

const numRescueBoats = function (people, limit) {
  people.sort((a, b) => a - b);
  //reading the problem ("at most 2 people"), we need to find a pair => 2 pointer
  let totalWeight = 0;
  let result = 0;
  let left = 0;
  let right = people.length - 1;
  while (left <= right) {
    //if l = r, we need to pick that person too
    //try to pair the heaviest with the lightest
    if (people[left] + people[right] <= limit) {
      result++;
      //2 weights / people taken
      left++;
      right--;
    } else {
      //otherwise, take the person at r (with higher weight: greedy)
      result++;
      //check for a smaller (than r) number from the end
      right--;
    }
  }
  return result;
};

//TC: O(n)
//SC: O(1)
