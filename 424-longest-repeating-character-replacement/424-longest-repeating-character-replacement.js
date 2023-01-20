// https://leetcode.com/problems/longest-repeating-character-replacement/

/**
 * @param {string}
 * @return {number}
 */
const characterReplacement = function (s, k) {
  let maxLength = 0;
  let maxRepeatCount = 0;
  let map = new Map();
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    map.set(s[end], (map.get(s[end]) || 0) + 1);
    maxRepeatCount = Math.max(maxRepeatCount, map.get(s[end]));
    let windowLength = end - start + 1;
    //intuition: consider 'aaaaabb', we will replace 'bb' with 'aa' to form 'aaaaaaa'
    //Why? Because 'a' is the most repeating charfacter in string => it's the other
    //characters that should be replaced ('bb') (after all we have a limit on replacements).
    //2. Exhaust all k replacements to get longest substring

    //basically, to get the longest substring with the same character,
    // we want all chars in window to match the most repeating char in any window (1 character repeating maxRepeatCount times)
    //in which case, we'd replace the less frequent chars
    //remaining letters (less frequent chars / letters to replace) = window - maxRepeatCount
    //letters to replace > k => shrink window (decrease char freq)
    if (windowLength - maxRepeatCount > k) {
      //we're sliding the window => the new window will not have the outgoing element anymore
      //=> decrease its frequency
      map.set(s[start], map.get(s[start]) - 1);
      start++;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

characterReplacement('ABAB', 2); //4

//TC: O(n): The for loop runs for n characters
//SC: O(1): O(26) (the max number of characters we can have in hashmap) asymptotically equal to O(1)
