/**
 * @param {string} s
 * @return {string[][]}
 */

//all strings can be partioned (resulting in a palindrome) by just sepearating them (since each character is a palindrome of itself). Ex: a => a, a => a, b => b

//Using backtracking, explore all possible ways to partition the given string and see if they result in a palidrome.

const isPalindrome = (s, l, r) => {
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
};

const partition = function (s) {
  const result = [];
  const currPartition = [];
  const backtrack = (i) => {
    if (i === s.length) {
      result.push([...currPartition]);
    }
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s, i, j)) {
        //substring from [i...j]
        currPartition.push(s.slice(i, j + 1));
        backtrack(j + 1);
        currPartition.pop();
      }
    }
  };
  backtrack(0);
  return result;
};
