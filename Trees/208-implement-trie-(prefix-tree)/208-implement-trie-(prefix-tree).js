/*

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.


Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True


Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.

*/

/*

Each TrieNode represents a character in the trie.
children is a Map that stores the child nodes for each character.
endOfWord is a flag indicating whether the current node represents the end of a word.

*/

class TrieNode {
  constructor() {
    this.children = new Map(); // Map to store child nodes
    this.endOfWord = false; // Flag to mark complete words
  }
}

const Trie = function () {
  // Initialize the trie with a root node
  this.root = new TrieNode();
};

/*

Intuition for Insert:
Starts at the root node
For each character in the word, creates a path if it doesn't exist
Marks the last node as the end of a complete word

*/

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let current = this.root;
  // Traverse through each character of the word
  for (let c of word) {
    // If the character doesn't exist as a child, create a new node
    if (!current.children.has(c)) {
      current.children.set(c, new TrieNode());
    }
    // Move to the child node for this character
    current = current.children.get(c);
  }
  // Mark the last node as the end of a complete word
  current.endOfWord = true;
};

/*

Intuition for Search:
Follows the path for each character
Returns false if any character is missing
Checks if the last node is marked as a complete word

*/

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let current = this.root;
  // Traverse through each character of the word
  for (let c of word) {
    // If any character is missing, word is not in trie
    if (!current.children.has(c)) {
      return false;
    } else {
      // Move to the next node
      current = current.children.get(c);
    }
  }
  // Ensure the word is a complete word (not just a prefix)
  return current.endOfWord;
};

/*

Intuition for StartsWith:
Similar to search, but doesn't require the last node to be a complete word
Checks if the entire prefix can be traversed

*/

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let current = this.root;
  // Traverse through each character of the prefix
  for (let c of prefix) {
    // If any character is missing, prefix doesn't exist
    if (!current.children.has(c)) {
      return false;
    } else {
      // Move to the next node
      current = current.children.get(c);
    }
  }
  // Prefix exists if we can traverse all characters
  return true;
};

/*

Time and Space Complexity:

Insert: O(m) time, where m is the length of the word
Search: O(m) time
StartsWith: O(m) time
Space Complexity: O(26n) in the worst case, where n is the number of words (with 26 representing alphabet size)

*/

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
