/*

Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#').

You are given a string array sentences and an integer array times both of length n where sentences[i] is a previously typed sentence and times[i] is the corresponding number of times the sentence was typed. For each input character except '#', return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.

Here are the specific rules:

The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.
The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same hot degree, use ASCII-code order (smaller one appears first).
If less than 3 hot sentences exist, return as many as you can.
When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.
Implement the AutocompleteSystem class:

AutocompleteSystem(String[] sentences, int[] times) Initializes the object with the sentences and times arrays.
List<String> input(char c) This indicates that the user typed the character c.
Returns an empty array [] if c == '#' and stores the inputted sentence in the system.
Returns the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed. If there are fewer than 3 matches, return them all.


Example 1:

Input
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
Output
[null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]

Explanation
AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
obj.input(" "); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
obj.input("a"); // return []. There are no sentences that have prefix "i a".
obj.input("#"); // return []. The user finished the input, the sentence "i a" should be saved as a historical sentence in system. And the following input will be counted as a new search.


Constraints:

n == sentences.length
n == times.length
1 <= n <= 100
1 <= sentences[i].length <= 100
1 <= times[i] <= 50
c is a lowercase English letter, a hash '#', or space ' '.
Each tested sentence will be a sequence of characters c that end with the character '#'.
Each tested sentence will have a length in the range [1, 200].
The words in each input sentence are separated by single spaces.
At most 5000 calls will be made to input.

*/

/**
 * @param {string[]} sentences
 * @param {number[]} times
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    /*
        Extend the basic Trie to include a sentences Map in each node
        Store sentences and their hot degrees
        This allows tracking sentences and their frequencies at each prefix level
        Map(4) {
        'i love you' => 5,
        'island' => 3,
        'iroman' => 2,
        'i love leetcode' => 2
        }
    */
    this.sentences = new Map();
  }
}

/*

Initialization Process:

Create a root Trie node
Initialize empty current sentence
Insert all initial sentences with their frequencies (hot degrees)

Time Complexity:
Let's say average sentence length is M
N sentences
For each sentence, we traverse and insert along its length: O(M)
For each character, we store the sentence in that node's Map: O(1)
Total: O(N × M)

*/

const AutocompleteSystem = function (sentences, times) {
  this.root = new TrieNode();
  this.currentSentence = '';
  this.currentNode = this.root;

  // Insert all initial sentences into the trie
  for (let i = 0; i < sentences.length; i++) {
    // Keep track of hot degrees for each sentence prefix
    this.insertSentence(sentences[i], times[i]);
  }
};

/**
 * @param {character} c
 * @return {string[]}
 */

/*

Insertion Intuition:

Build a path in the Trie for each sentence
Update hot degrees for every prefix
Allow efficient tracking of sentence frequencies

All sentences are properly inserted with their hot degrees
For the prefix "i", we store all 4 sentences
For "i l", we store both "i love you" and "i love leetcode"

Time complexity: O(L)

*/

// Insert a sentence into the trie
AutocompleteSystem.prototype.insertSentence = function (sentence, hotDegree) {
  let current = this.root;

  // Insert each character of the sentence
  for (let char of sentence) {
    // Traverse each character and create nodes if they don't exist
    if (!current.children.has(char)) {
      current.children.set(char, new TrieNode());
    }
    current = current.children.get(char);

    // current is the node which has the current char of sentence
    // Store sentence and its hot degree in the current node

    // For the prefix "i", we store all 4 sentences
    // For "i l", we store both "i love you" and "i love leetcode"
    current.sentences.set(
      sentence,
      (current.sentences.get(sentence) || 0) + hotDegree
    );
  }
};

/*

Input:

Handle '#' (end of sentence):
Insert current sentence
Reset search state
Return empty list


Build current sentence:
Append new character
Traverse Trie to find matching prefix

Collect Suggestions:
Gather all sentences at current prefix node
Sort by:
a) Hot degree (descending)
b) Lexicographic order (ASCII)
Return top 3 suggestions

Time complexity:
Traverse to current prefix node: O(P) where P is current prefix length
Collect all matching sentences at current node: O(K) where K is # of matching sentences
Sort these sentences: O(K logK)
Extract top 3: O(1)
Total: O(P + K logK)

*/

AutocompleteSystem.prototype.input = function (c) {
  // If end of sentence, store and reset
  if (c === '#') {
    // When we hit '#', we need to increment the hot degree of the current sentence
    // because the user just typed it again
    this.insertSentence(this.currentSentence, 1);
    this.currentSentence = '';
    return [];
  }

  // Build current sentence
  this.currentSentence += c;

  // Find the current node for the prefix
  let current = this.root;
  for (let char of this.currentSentence) {
    if (!current.children.has(char)) {
      return []; // No matches
    }
    current = current.children.get(char);
  }

  // Collect all sentences at the current prefix node
  let sentenceList = [];
  for (let [sentence, hotDegree] of current.sentences) {
    sentenceList.push({ sentence, hotDegree });
  }

  // Sort by hot degree (descending) and then lexicographically
  return (
    sentenceList
      // Sort sentences by: a) Hot degree (descending) b) Lexicographic order (ASCII code)
      .sort(
        (a, b) =>
          b.hotDegree - a.hotDegree || (a.sentence < b.sentence ? -1 : 1)
      )
      // Top 3 matching sentences
      .slice(0, 3)
      .map((item) => item.sentence)
  );
};

/*

Space Complexity:

Basic Trie Structure:

Each character in each sentence needs a node
For N sentences of average length M
Base trie structure: O(N × M)

Additional Storage in Each Node:


Each node contains a Map of complete sentences that pass through it
For "i love you", at node 'i', we store the whole sentence
Each character node could potentially store O(N) sentences
For each sentence stored, we need O(M) space
So each node could use O(N × M) space
Total nodes × space per node = O(N × M) × O(N × M)
Overall: O(N² × M²)
*/

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */
