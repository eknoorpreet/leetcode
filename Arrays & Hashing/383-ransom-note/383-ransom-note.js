/*

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.



Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true


Constraints:

1 <= ransomNote.length, magazine.length <= 10^5
ransomNote and magazine consist of lowercase English letters.

*/

const canConstruct = function (ransomNote, magazine) {
  // Obvious fail case
  if (ransomNote.length > magazine.length) return false;
  const charFrequency = new Map(); // store frequencies of characters in ransomNote
  for (let i = 0; i < ransomNote.length; i++) {
    charFrequency.set(
      ransomNote[i],
      (charFrequency.get(ransomNote[i]) || 0) + 1
    );
  }

  // Iterate over magazine string
  for (let i = 0; i < magazine.length; i++) {
    // If the curr char is also present in ransomNote, is it the same frequency?
    if (charFrequency.has(magazine[i]))
      charFrequency.set(magazine[i], charFrequency.get(magazine[i]) - 1);
  }

  // If any character exists more times in ransomNote than in magazine => false
  for (const [char, frequency] of charFrequency.entries()) {
    if (frequency > 0) return false;
  }
  return true;
};

/*

m is the length of the magazine, and n is the length of the ransom note.

Time Complexity :O(m + n)

Space Complexity : O(k) / O(1).

For this problem, because k is never more than 26, which is a constant, it'd be reasonable to say that this algorithm requires O(1) space.

*/
