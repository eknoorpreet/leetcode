/*

You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.



Example 1:

Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
Example 2:

Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
Explanation: The only word "havana" will be always suggested while typing the search word.


Constraints:

1 <= products.length <= 1000
1 <= products[i].length <= 3000
1 <= sum(products[i].length) <= 2 * 10^4
All the strings of products are unique.
products[i] consists of lowercase English letters.
1 <= searchWord.length <= 1000
searchWord consists of lowercase English letters.

*/

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */

/*

Key Intuition:

Sort products first so we can find lexicographically smallest matches
Use two pointers to maintain a window of valid matches
Shrink this window as we type more characters

products = ["mobile","mouse","moneypot","monitor","mousepad"]
searchWord = "mouse"

After sorting:
products = ["mobile","moneypot","monitor","mouse","mousepad"]

Step 1: char = 'm'
Initial array:  ["mobile","moneypot","monitor","mouse","mousepad"]
                 ^                                            ^
                left                                        right
All start with 'm' so window stays the same
Result: ["mobile","moneypot","monitor"] (first 3)

Step 2: char = 'o'
["mobile","moneypot","monitor","mouse","mousepad"]
  ^                                            ^
Window stays same as all have 'mo'
Result: ["mobile","moneypot","monitor"]

Step 3: char = 'u'
["mobile","moneypot","monitor","mouse","mousepad"]
                               ^      ^
Window shrinks to only words with 'mou'
Result: ["mouse","mousepad"]

*/

const suggestedProducts = function (products, searchWord) {
  const result = [];
  products.sort();
  let left = 0;
  let right = products.length - 1;

  for (let i = 0; i < searchWord.length; i++) {
    const char = searchWord[i];
    // Move left pointer until we find matching prefix
    // Skip words that are too short
    while (
      left <= right &&
      (products[left]?.length <= i || products[left]?.[i] !== char)
    ) {
      left++;
    }
    // Move right pointer until we find matching prefix
    // Skips words that are too short
    while (
      left <= right &&
      (products[right]?.length <= i || products[right]?.[i] !== char)
    ) {
      right--;
    }
    result.push([]);
    // Add up to 3 products from current window
    // Math.min(3, remaining) ensures we don't exceed window size
    // result.at(-1) accesses the last array in results
    const remaining = right - left + 1;
    for (let j = 0; j < Math.min(3, remaining); j++) {
      result.at(-1).push(products[left + j]);
    }
  }
  return result;
};

/*

Time and Space Complexity:

Time: O(nlogn) for initial sort + O(n) for searching = O(nlogn)
Space: O(n) for sorting and output array

*/
