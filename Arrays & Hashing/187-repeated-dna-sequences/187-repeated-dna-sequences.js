/*

The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.



Example 1:

Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
Example 2:

Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]


Constraints:

1 <= s.length <= 10^5
s[i] is either 'A', 'C', 'G', or 'T'.

*/

/**
 * @param {string} s
 * @return {string[]}
 */

const findRepeatedDnaSequences = function (s) {
  const result = new Set(); //make sure result doesn't contain duplicate sequence
  const set = new Set(); //catch repeated / duplicate sequence

  for (let i = 0; i < s.length - 9; i++) {
    const currSeq = s.slice(i, i + 10); //(not including last)
    //repeating twice or more?
    if (set.has(currSeq)) {
      result.add(currSeq);
    }
    set.add(currSeq);
  }
  return Array.from(result);
};
