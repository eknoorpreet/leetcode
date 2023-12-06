/*

There are n people standing in a queue, and they numbered from 0 to n - 1 in left to right order. You are given an array heights of distinct integers where heights[i] represents the height of the ith person.

A person can see another person to their right in the queue if everybody in between is shorter than both of them. More formally, the ith person can see the jth person if i < j and min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1]).

Return an array answer of length n where answer[i] is the number of people the ith person can see to their right in the queue.



Example 1:



Input: heights = [10,6,8,5,11,9]
Output: [3,1,2,1,1,0]
Explanation:
Person 0 can see person 1, 2, and 4.
Person 1 can see person 2.
Person 2 can see person 3 and 4.
Person 3 can see person 4.
Person 4 can see person 5.
Person 5 can see no one since nobody is to the right of them.
Example 2:

Input: heights = [5,1,2,3,10]
Output: [4,1,1,1,0]


Constraints:

n == heights.length
1 <= n <= 10^5
1 <= heights[i] <= 10^5
All the values of heights are unique.

/**
 * @param {number[]} heights
 * @return {number[]}
 */

/*

Basically, a person can see all people to the right as long as he does not encounter a person
with same or greater height than him.

*/

const canSeePersonsCount = function (heights) {
  let stack = [];
  let result = new Array(heights.length).fill(0);
  for (let i = 0; i < heights.length; i++) {
    //did we find a greater/equal height person
    while (stack.length && heights[stack.at(-1)] <= heights[i]) {
      //we find 10's next greater/equal => 11 (this is as far as we can see)
      //Must mean that heights in b/w were smaller than 10
      //and also smaller than 11 (since 11 > 10)

      //6 can see 8 (greater) but can't see after 8 => 6 popped off
      let stackTop = stack.pop();
      //increment count for 6 (since 6 can see 8)
      result[stackTop]++;
    }
    //10 didn't find its next greater in 6
    //10 > 6 => it can see 6 => increment count for 10

    //here, we didn't find the next greater/equal
    //means we found shorter ones => can see => increment count since we
    //can see shorter ones
    if (stack.length) {
      result[stack.at(-1)]++;
    }
    stack.push(i);
  }
  return result;
};

//TC: O(n)
//SC: O(n)
