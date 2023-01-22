//https://leetcode.com/problems/permutation-in-string/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  let start = 0;
  let matches = 0;

  //a hashmap to store the frequencies of all characters in the pattern
  const map = new Map();
  for (let i = 0; i < s1.length; i++) {
    map.set(s1[i], (map.get(s1[i]) || 0) + 1);
  }
  for (let end = 0; end < s2.length; end++) {
    //if the character being added matches a character in the HashMap,
    //decrement its frequency
    if (map.has(s2[end])) {
      map.set(s2[end], map.get(s2[end]) - 1);
      //if frequency becomes zero => frequency of the character in pattern and window are equal
      if (map.get(s2[end]) === 0) matches++;
    }
    //if frequency of all characters in pattern and window are equal => permutation exists!
    if (matches === map.size) return true;
    // if window size is greater than the pattern length, shrink window (to the size of the pattern)
    if (end >= s1.length - 1) {
      //character going out was in the pattern, then we must have decreased irs frequency before
      if (map.has(s2[start])) {
        if (map.get(s2[start]) === 0) matches--;
        //increment is frequency
        map.set(s2[start], map.get(s2[start]) + 1);
      }
      start++;
    }
  }
  return false;
};

checkInclusion('aabc', 'aaacb'); //true

//TC: O(26 + n) => O(n) where n is the number of characters in the input string

//SC: O(26) => O(1) since in the worst case, the whole pattern can have 26 distinct characters which will go into the hashmap.
