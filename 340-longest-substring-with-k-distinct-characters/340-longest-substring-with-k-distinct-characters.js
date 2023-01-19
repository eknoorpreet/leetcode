//https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters

const longestSubstr = (str, k) => {
  //since we need to find the longest substring, we need to make sure that we're utilizing all k distinct characters
  //a hashmap (with its size) can give us the number of distinct characters and
  //its values can give us the frequencies
  let map = new Map(); //will hold k distinct characters and their frequencies (act as a slidiing window)
  let maxLength = 0;
  let start = 0;
  for (let end = 0; end < str.length; end++) {
    map.set(str[end], (map.get(str[end]) || 0) + 1);
    //map size exceeding k
    while (map.size > k) {
      //map.size = k is fine ('baaaaaa', k = 2) => valid
      //slide/shrink the window (decrease its frequency)
      //as long as window (map) size is k again

      //(here, had we tried to slide window without a hashmap, it would not have worked.
      //For eg., we try to remove the first character ('a') of window to get to k distinct characters
      //but no. of distinct characters is the same since there's one more 'a'. That's why storing frequencies
      //is important. Furthemore, map size dictates distinct characters easily)
      map.set(str[start], map.get(str[start]) - 1);
      if (map.get(str[start]) === 0) {
        map.delete(str[start]); //update distinct characters
      }
      start++;
    }
    maxLength = Math.max(maxLength, end - start + 1);
  }
  console.log(maxLength);
  return maxLength;
};

longestSubstr('araaci', 2);
longestSubstr('araaci', 1);
longestSubstr('cbbebi', 3);

//TC: O(n): The for loop runs for n elements while the inner while loop runs only when map size > k
//and slides the window accordingly (running through each element once) => O(n + n) => O(n)
//SC: O(k): Although the map size would exceed k by 1 => still O(k)
