/**
 * @param {string[]} nums
 * @return {string}
 */

//we start from "00", exists? If it doesn't, return it. Else, add 1 and check that
//faster lookups => hash set

//n (length of input array or length of each string) digits reached (checking via 'i')? Check if the resultant string exists.
//in many languages, you can't mutate the index of a string. THerefore, instead of "00", we use ["0", "0"]

//note: we start from i = 0 to denote "". Here, i does not denote index but number of digits

const findDifferentBinaryString = function (nums) {
  const set = new Set(nums);
  const backtrack = (i, curr) => {
    if (i === nums.length) {
      result = curr.join('');
      return set.has(result) ? null : result;
    }

    //chossing "0"
    result = backtrack(i + 1, curr);
    if (result) return result; //don't have to find all of them. If found 1, return it

    //chossing "1"
    curr[i] = '1';
    result = backtrack(i + 1, curr);
    curr[i] = '0'; //can also give us an (different) answer ("10")
    if (result) return result; //don't have to find all of them. If found 1, return it
  };
  return backtrack(0, new Array(nums.length).fill('0'));
};

//TC: n strings => 2^n possibilities but we don't have to find all of them. Just 1 thing that does not exist
//=> n + 1 strings will be checked => checking if n + 1 strings exist => n (n + 1) = O(n^2)
//height of the tree = n
