// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string}
 * @return {number}
 */

const lengthOfLongestSubstring = function (s) {
  //intuition: when we hit a character already visited before => slide window
  //(move start to next character after repeating one; the last index of the
  //repeating character beign stored in the hashmap)
  let maxLength = 0;
  //a hashmap to store characters and their (last) indices (so we know ehere to start from when
  //we encounter a repeating character)
  let map = new Map(); //stores char, last index
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    //character already in hashmap (repeating char) ? => shrink window so we only
    //have 1 freq of character (i.e. exclude that character from beginning)
    //get its index via map.get(s[end]) and start from next
    if (map.has(s[end])) {
      //important! Why not set start to map.get(s[end]) + 1?
      //Consider 'abccad'. At 2nd 'c', we move stat to 3. At 'a', we move start to ... 1 => wrong!
      //Since map.get('a') (1) > start (3), that character is not present in our window => no need to slide!
      start = Math.max(start, map.get(s[end]) + 1);
    }
    map.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

lengthOfLongestSubstring('abcabcbb'); //3

//TC: O(n): The for loop runs for n characters
//SC: O(k), n = number of distinct characters in string; k <= n but since characters are 26 => O(1)
