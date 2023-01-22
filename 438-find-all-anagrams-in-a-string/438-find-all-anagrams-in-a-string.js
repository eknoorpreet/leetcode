// https://leetcode.com/problems/find-all-anagrams-in-a-string

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function (s, p) {
  let matches = 0;
  let result = [];
  let map = new Map();
  for (let i = 0; i < p.length; i++) {
    map.set(p[i], (map.get(p[i]) || 0) + 1);
  }
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      map.set(s[end], map.get(s[end]) - 1);
      if (map.get(s[end]) === 0) matches++;
    }
    if (matches === map.size) result.push(start);
    if (end >= p.length - 1) {
      if (map.has(s[start])) {
        if (map.get(s[start]) === 0) matches--;
        map.set(s[start], map.get(s[start]) + 1);
      }
      start++;
    }
  }
  return result;
};

findAnagrams('cbaebabacd', 'abc'); //[0,6]

//TC: O(n) where n is the number of characters in the input string

//SC: O(26) => O(1) since in the worst case, the whole pattern can have 26 distinct characters which
//will go into the hashmap.
