/*Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time. */

/**
 * @param {number[]} nums
 * @return {number}
 */

//TC: O(n^3)
//SC: O(1) (only allocates a handful of integers, so it uses constant additional space)
// const arrayContains = (arr, num) => {
//     for (let i = 0; i < arr.length; i++) { //O(n)
//         if (arr[i] == num) {
//             return true;
//         }
//     }
//     return false;
// }

// const longestConsecutive = (nums) => {
//     let maxSeqLength = 0;
//     for (let num of nums) { //O(n)
//         let currentNum = num;
//         let currSeqLength = 1;
//         while (arrayContains(nums, currentNum + 1)) { //O(n)
//             currentNum += 1;
//             currSeqLength += 1;
//         }
//         maxSeqLength = Math.max(maxSeqLength, currSeqLength);
//     }
//     return maxSeqLength;
// }

//TC: O(nlogn)
//SC: O(1)
// const longestConsecutive = function(nums) {
//     if(nums.length === 0) return 0
//     let maxSeqLength = 1;
//     //because we need to compare each number to its previous number
//     nums.sort((a, b) => a - b)
//     let currSeqLength = 1;
//     for(let i = 1; i < nums.length; i++) {
//         if(nums[i - 1] === nums[i]) continue; //no change in sequence
//         //diff b/w pair = 1 => sequence extended
//         if(nums[i] - nums[i - 1] === 1) {
//             currSeqLength++
//         }
//         //diff b/w pair more than 1 => sequence broken
//         else {
//             maxSeqLength = Math.max(maxSeqLength, currSeqLength)
//             currSeqLength = 1
//         }
//     }
//     //possible that the last element is part of the longest sequence, so we return the maximum of the current sequence and the longest one.
//     return Math.max(maxSeqLength, currSeqLength)
// };

//TC: O(n)
//SC: O(n)
const longestConsecutive = function (nums) {
  let maxSeqLength = 0;
  const set = new Set(nums);
  for (let i = 0; i < nums.length; i++) {
    //if the set does not have a preceding number (start of sequence)
    //if the set has a preceding number, we'll try to find it via iteration
    //(this is how we find start of sequence)
    /*only attempt to build sequences from numbers that are not already part
            of a longer sequence. This is accomplished by first ensuring that the
            number that would immediately precede the current number in a
            sequence is not present, as that number would necessarily be part of
            a longer sequence.*/
    //no left neighbour => start of a sequence!
    //100 => 99 doesn't exist => start of seq => length = 1
    //4 => 3 exists => NOT a start of seq
    //200 => 199 doesn't exist => NOT a start of seq
    //1 => 0 doesn't exist => NOT a start of seq => length = 4
    //3 => 2 exists => NOT a start of seq
    //2 => 1 exists => NOT a start of seq
    if (!set.has(nums[i] - 1)) {
      //curr sequence starts from here
      let currLength = 1;
      //build curr sequence
      while (set.has(nums[i] + currLength)) {
        currLength++;
      }
      //sequence ended! => calculate its length
      maxSeqLength = Math.max(currLength, maxSeqLength);
    }
  }
  return maxSeqLength;
};
