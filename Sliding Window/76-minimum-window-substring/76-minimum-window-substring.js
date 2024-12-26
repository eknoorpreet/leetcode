// https://leetcode.com/problems/minimum-window-substring/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

/*

Idea: We first try to match every occurrence of each character in the pattern with the string.
If number of matches equals the pattern length, a window found. We try to shorten and remember
the min length. If, while shortening it, the condition (matches equals the pattern length) fails,
move to next potential window. The shortening procedure will be repeated for the future windows.

In the other problem (permutation in string), we're looking for an EXACT match - the frequency of
each character must match exactly. So we only increment matches when we hit exactly 0 (perfect
match for that character).

Example for permutation ("ab" in "eidbaooo"):

Initial map: { 'a': 1, 'b': 1 }

When we find 'a':
map['a'] goes 1 → 0   // === 0, so matches++
This means we have EXACTLY the right number of 'a's

When we find 'b':
map['b'] goes 1 → 0   // === 0, so matches++
This means we have EXACTLY the right number of 'b's

In this problem, we need AT LEAST the required frequency of each character. Extra characters are
allowed. So we increment matches for each required character we find (when count is still ≥ 0).
Example for minimum window ("AAB" in some string):

Initial map: { 'A': 2, 'B': 1 }

First 'A':
map['A'] goes 2 → 1   // >= 0, so matches++
Count first required 'A'

Second 'A':
map['A'] goes 1 → 0   // >= 0, so matches++
Count second required 'A'

First 'B':
map['B'] goes 1 → 0   // >= 0, so matches++
Count required 'B'

Extra 'A':
map['A'] goes 0 → -1  // Not >= 0, so no matches++
Don't count extra characters

Unlike 'permutation in string' and anagram, we can't rely on the logic: if (matches === map.size) return true;
Why? Because here, the required substring can have some additional characters and
doesn’t need to be a permutation of the pattern

*/
const minWindow = function (s, t) {
  let matches = 0;
  let substrStart = 0;
  let minLength = s.length + 1;

  //a hashmap to store the frequencies of all characters in the pattern
  let map = new Map();

  for (let i = 0; i < t.length; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1);
  }
  let windowStart = 0;
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    //if the character being added matches a character in the HashMap,
    //decrement its frequency
    if (map.has(s[windowEnd])) {
      map.set(s[windowEnd], map.get(s[windowEnd]) - 1);
      // count EVERY matching instance of a character (including duplicates)
      // If the current character now -1 in the HashMap, it's an extra! (does not contribute, so no matches++)
      if (map.get(s[windowEnd]) >= 0) matches++;
    }
    //matched all characters => shrink the window to get the smallest window
    while (matches === t.length) {
      //minLength > current window length
      if (minLength > windowEnd - windowStart + 1) {
        //set it to window length
        minLength = windowEnd - windowStart + 1;
        substrStart = windowStart;
      }
      //character going out was in the pattern, then we must have decreased its frequency before
      if (map.has(s[windowStart])) {
        if (map.get(s[windowStart]) === 0) matches--;
        //increment is frequency
        map.set(s[windowStart], map.get(s[windowStart]) + 1);
      }
      windowStart++;
    }
  }
  if (minLength > s.length) return '';
  //return the substring
  return s.substring(substrStart, substrStart + minLength);
};

minWindow('ADOBECODEBANC', 'ABC');

/*

Time Complexity: O(n) where n is the length of string s

We scan string s once with our sliding window
The while loop for contracting the window might seem like it would add another n, but each
position can only be contracted once, so amortized it's still O(n)
All map operations are O(1)


Space Complexity: O(m) where m is the number of unique characters in string t
We store the frequency map for characters in t. Again, for alphabet characters this is bounded by 26.
Therefore, O(1)


*/
