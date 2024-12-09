/**
 * @param {string[]} sentences
 * @param {number[]} times
 */

class TrieNode {
  constructor() {
    this.children = new Map();
    // Extend the basic Trie to include a sentences Map in each node
    this.sentences = new Map(); // Store sentences and their hot degrees
  }
}

/*

Initialization Process:

Create a root Trie node
Initialize empty current sentence
Insert all initial sentences with their frequencies

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

Builds a path in the Trie for each sentence
Updates hot degrees for every prefix
Allows efficient tracking of sentence frequencies

*/

// Insert a sentence into the trie
AutocompleteSystem.prototype.insertSentence = function (sentence, hotDegree) {
  let current = this.root;

  // Insert each character of the sentence
  for (let char of sentence) {
    // Traverse each character and creat nodes if they don't exist
    if (!current.children.has(char)) {
      current.children.set(char, new TrieNode());
    }
    current = current.children.get(char);

    // Update hot degrees for each prefix of the sentence
    if (!current.sentences.has(sentence)) {
      current.sentences.set(sentence, 0);
    }
    // If a sentence is already present, increase its hot degree
    current.sentences.set(
      sentence,
      current.sentences.get(sentence) + hotDegree
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

*/

AutocompleteSystem.prototype.input = function (c) {
  // If end of sentence, store and reset
  if (c === '#') {
    this.insertSentence(this.currentSentence, 1);
    this.currentSentence = '';
    this.currentNode = this.root;
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

Time Complexity:

Initialization: O(n * m), where n is number of sentences, m is sentence length
Insertion: O(m)
Input/Autocomplete: O(m + k log k), where m is prefix length, k is number of matching sentences

Space Complexity:

O(26 * n * m), where n is total number of sentences, m is average sentence length

*/

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */
