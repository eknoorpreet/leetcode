/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

//TC: O(nlogn)
//SC: O(1)
// const isAnagram = function(s, t) {
//     if(s.length !== t.length) return false
//     return [...s].sort().join("") === [...t].sort().join("")
// };

//TC: O(s)
//SC: O(s + t)
// const isAnagram = function(s, t) {
//     if(s.length !== t.length) return false
//     const sMap = new Map() //count frequencies of chars in s
//     const tMap = new Map() //count frequencies of chars in t
//since both s and t are of same length, we only traverse through 1
//     for(let i = 0; i < s.length; i++) {
//store frequencies of curr char of s
//         sMap.set(s[i], (sMap.get(s[i]) || 0) + 1)
//store frequencies of curr char of t
//         tMap.set(t[i], (tMap.get(t[i]) || 0) + 1)
//     }

//     for(let c of sMap.keys()) {
//         if(sMap.get(c) !== tMap.get(c)) return false
//     }
//     return true
// };

//TC: O(s+t)
//SC: O(s)
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const charFrequency = new Map();
  for (let char of s) {
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
  }
  for (let char of t) {
    charFrequency.set(char, charFrequency.get(char) - 1);
  }
  for (let [char, frequency] of charFrequency.entries()) {
    if (frequency > 0) return false;
  }
  return true;
};
