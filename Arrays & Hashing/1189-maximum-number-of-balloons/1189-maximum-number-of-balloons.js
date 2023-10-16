/*

Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

You can use each character in text at most once. Return the maximum number of instances that can be formed.



Example 1:



Input: text = "nlaebolko"
Output: 1
Example 2:



Input: text = "loonbalxballpoon"
Output: 2
Example 3:

Input: text = "leetcode"
Output: 0


Constraints:

1 <= text.length <= 104
text consists of lower case English letters only.

*/

/**
 * @param {string} text
 * @return {number}
 */
const maxNumberOfBalloons = function (text) {
  const str = 'balloon';
  let charFrequency = new Map();
  for (let c of str) {
    charFrequency.set(c, 0);
  }
  for (let c of text) {
    //only care about frequency if it has letters of "balloon"
    //(since we want to observe min freq of chars and if a char not in
    //"balloon" has freq of 0, our algo will return 0 => wrong!)
    if (charFrequency.has(c)) charFrequency.set(c, charFrequency.get(c) + 1);
  }

  //"Balloon" has two characters "l" and "o" that repeat twice. To account for twice as many characters, we do integer division by 2.
  //i.e. 1 of other characters + 2 of 'l', 'o' make 'balloon'
  //Hence, 2 of 'l', 'o' are equivalent to 1 of every other character
  charFrequency.set('l', Math.floor(charFrequency.get('l') / 2));
  charFrequency.set('o', Math.floor(charFrequency.get('o') / 2));

  //we should have atleast 1 char of "balloon" in map
  let count = Number.POSITIVE_INFINITY;
  for (let [char, freq] of charFrequency) {
    //min frequency of a char will decide max number of "balloons"
    //ex: if every char has freq of 5 but 'n' only appears once => max = 1
    //actual occurences in input string / required characters in "balloon"
    count = Math.min(count, freq);
  }
  return count;
};

//TC: O(n), n characters in string
//SC: O(7) => O(1), fixed number (7) of characters in "balloon"
