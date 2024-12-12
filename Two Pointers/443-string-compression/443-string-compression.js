/*

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.



Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".


Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.

*/

/**
 * @param {character[]} chars
 * @return {number}
 */

/*

Core Intuition: In-Place Two-Pointer Technique
Use two pointers to compress the array in-place:

walker: Keeps track of where to write the compressed characters
runner: Traverses through the array to identify consecutive character groups

Detailed Algorithm Breakdown:

Main Traversal Logic

Start with both walker and runner at the beginning of the array
walker will write the compressed version
runner explores the array to find consecutive character groups

Compression Steps

First, write the current character at walker
Count consecutive occurrences of the character

Handling Consecutive Characters

If count is > 1, convert count to string
Write each digit of the count sequentially
Increment walker for each digit written

*/

const compress = function (chars) {
  let walker = 0; // Keeps track of where to write the compressed characters
  let runner = 0; // Traverses through the array to identify consecutive character groups
  while (runner < chars.length) {
    // Write the current character at walker
    chars[walker] = chars[runner];
    // Count consecutive occurrences of the character
    let count = 1;

    while (runner + 1 < chars.length && chars[runner] === chars[runner + 1]) {
      runner++;
      count++;
    }
    // If count > 1
    if (count > 1) {
      const strCount = `${count}`;
      for (let i = 0; i < strCount.length; i++) {
        // Write each digit of the count sequentially
        chars[walker + 1] = strCount[i];
        // Increment walker for each digit written
        walker++;
      }
    }
    walker++;
    runner++;
  }
  return walker;
};

// TC: O(n)
// SC: O(1)
