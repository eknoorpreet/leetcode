/*

A sentence is a list of words that are separated by a single space with no leading or trailing spaces.

You are given an array of strings sentences, where each sentences[i] represents a single sentence.

Return the maximum number of words that appear in a single sentence.



Example 1:

Input: sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
Output: 6
Explanation:
- The first sentence, "alice and bob love leetcode", has 5 words in total.
- The second sentence, "i think so too", has 4 words in total.
- The third sentence, "this is great thanks very much", has 6 words in total.
Thus, the maximum number of words in a single sentence comes from the third sentence, which has 6 words.
Example 2:

Input: sentences = ["please wait", "continue to fight", "continue to win"]
Output: 3
Explanation: It is possible that multiple sentences contain the same number of words.
In this example, the second and third sentences (underlined) have the same number of words.

*/

/**
 * @param {string[]} sentences
 * @return {number}
 */

const mostWordsFound = function (sentences) {
  let maxWords = 0;
  for (const sentence of sentences) {
    const words = sentence.split(' ');
    maxWords = Math.max(maxWords, words.length);
  }
  return maxWords;
};

/*

Let n be the number of sentences in sentences.
Let m be the length of the longest sentence.

TC: O(n * m)
SC: O(m)

The split(" ") function creates an array of words for each sentence.
In the worst case, a sentence consists of m words, leading to O(m) space usage per iteration.
Since we do not store all split results (only one at a time), the total space complexity remains O(m) (excluding input storage).

*/
