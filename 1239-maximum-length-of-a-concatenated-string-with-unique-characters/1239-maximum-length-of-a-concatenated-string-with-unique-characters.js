/**
 * @param {string[]} arr
 * @return {number}
 */

//sub-sequence: choosing or not choosing a substring; here, should have unique characters

//we want to count the occurences of each character in our concatenation so far before adding the curr substring
const maxLength = function (arr) {
  const set = new Set();
  const overlap = (set, s) => {
    //set argument represents our concatenation
    const prev = new Set(); //confirm unique characters in the curr substring. Ex: "bb" => overlaps
    for (let c of s) {
      //does our concatenation contains a character of curr substring or
      //does the curr substring contain duplicate characters => overlaps
      if (set.has(c) || prev.has(c)) return true;
      prev.add(c);
    }
    return false;
  };
  const backtrack = (i) => {
    if (i === arr.length) return set.size; //set will only have unique characters (in current concatenation); return its length
    let result = 0;
    //make a choice of including arr[i] only if its characters do not have duplicate characters with our
    //concatenation so far (set)
    if (!overlap(set, arr[i])) {
      //add all characters of curr substring and add to concatenation
      for (let c of arr[i]) {
        set.add(c);
      }
      //continue on to the next substring
      result = backtrack(i + 1);
      //when you come out of the call for the next substring, backtrack!
      for (let c of arr[i]) {
        set.delete(c);
      }
    }

    //do not include curr substring
    return Math.max(result, backtrack(i + 1));
  };
  return backtrack(0);
};

//TC: Each substring, we can choose or not choose it => 2 choices for each element => 2^n for n elements
//=> 2^n*m for n elements with average length m
