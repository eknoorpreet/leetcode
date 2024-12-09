/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

/*

The goal is to find the shortest transformation sequence between two words, where:

Each step changes only one letter
Each intermediate word must be in the word list
We want the minimum number of words in the sequence

graph: {*ot: [hot, dot, lot]}

"shortest transformation sequence" => BFS

The key insight is creating "generic" word patterns
For "hit", we create patterns like:

"*it" (first letter changed)
"h*t" (middle letter changed)
"hi*" (last letter changed)

adjacencyList: {'*ot' => [ 'hot', 'dot', 'lot' ]} (All words have 1 letter difference, marked by *)
"Words: [ 'hot', 'dot', 'lot' ] can be created by changing just that 1 letter, marked by *"

This allows quick matching of words that differ by one letter

In BFS, when you process a level, you've found the shortest path to all words at that level.
Each level represents the minimum number of transformations needed to reach those words.
The result increments after processing each level. This naturally tracks the length of the transformation sequence.
When endWord is found, result represents the minimum number of words in the sequence

Let's visualize with an example:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Level 0: ["hit"]           # Start
Level 1: ["hot"]           # First transformations
Level 2: ["dot", "lot"]    # Second transformations
Level 3: ["dog", "log"]    # Third transformations
Level 4: ["cog"]           # Target found!

If we didn't do level-by-level processing:
We might explore deeper paths before finding the shortest
We'd lose the automatic tracking of transformation length
The algorithm would be less efficient and might not guarantee the shortest path

*/

const ladderLength = function (beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  const adjacencyList = new Map();
  // Add beginWord to wordList so we can create its patterns
  wordList.push(beginWord);
  for (let word of wordList) {
    for (let j = 0; j < word.length; j++) {
      // Create a pattern by replacing one (jth) character with *
      let pattern = word.slice(0, j) + '*' + word.slice(j + 1);
      // Group words with same pattern
      adjacencyList.set(
        pattern,
        adjacencyList.get(pattern)
          ? [...adjacencyList.get(pattern), word]
          : [word]
      );
    }
  }
  // adjacencyList: {'*ot' => [ 'hot', 'dot', 'lot' ], 'h*t' => [ 'hot', 'hit' ]}
  const visited = new Set();
  // Prevents revisiting words
  visited.add(beginWord);
  const queue = [beginWord];
  // Length of transformation sequence
  let result = 1;
  while (queue.length) {
    // Capture how many words are at the current level
    const levelSize = queue.length;
    // Explore words level by level
    for (let i = 0; i < levelSize; i++) {
      // Process each word at the current level
      const word = queue.shift();
      // Check if we've reached the end
      if (word === endWord) return result;
      // Explore all possible one-letter transformations of the current word
      // Find all words that match this pattern
      for (let j = 0; j < word.length; j++) {
        let pattern = word.slice(0, j) + '*' + word.slice(j + 1);
        // Find and add unvisited neighbors
        for (let neighbourWord of adjacencyList.get(pattern) ?? []) {
          // Only add unvisited words (to prevent cycles)
          if (!visited.has(neighbourWord)) {
            queue.push(neighbourWord);
            visited.add(neighbourWord);
          }
        }
      }
    }
    result++;
  }
  return 0;
};

/*

Time and Space Complexity

Time Complexity: O(M * N * 26), where

M is word length
N is number of words

Space Complexity: O(M * N)

*/
