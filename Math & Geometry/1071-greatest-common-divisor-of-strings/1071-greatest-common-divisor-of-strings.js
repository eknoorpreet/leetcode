/*

For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.



Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""


Constraints:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of English uppercase letters.

*/

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */

/*

Brute force: Check every possible string until we find the GCD string
As the problem indicates that we need to find the greatest common divisor string (longest length), we should start with the longest possible prefix string, which is the shorter string between str1 and str2.

*/
const gcdOfStrings0 = function (str1, str2) {
  let len1 = str1.length;
  let len2 = str2.length;

  const valid = (k) => {
    // If the length of the potential GCD does not fully divide both the stirngs => NOT a GCD!
    if (len1 % k !== 0 || len2 % k !== 0) return false;
    const n1 = len1 / k;
    const n2 = len2 / k;
    // Generate potential GCD via its length (k)
    const base = str1.slice(0, k);
    // If we repeat the GCD n1 and n2 times, do we get str1 and str2? => true, else => false
    return str1 === base.repeat(n1) && str2 === base.repeat(n2);
  };

  // Iterate from the end to the front
  // If curr string is not a GC, we remove one character and try
  for (let i = Math.min(len1, len2); i > 0; i--) {
    // i here denotes the length of a potential GCD (as we start from the end)
    if (valid(i)) return str1.slice(0, i);
  }

  // No GCD
  return '';
};

/*

Let m,n be the lengths of the two input strings str1 and str2.

Time complexity: O(min(m,n)⋅(m+n))
We checked every prefix string base of the shorter string among str1 and str2, and verify if both strings are made by multiples of base. There are up to min(m,n) prefix strings to verify and each check involves iterating over the two input strings to check if the current base is the GCD string, which costs O(m+n). Therefore, the overall time complexity is O(min(m,n)⋅(m+n)).

Space complexity: O(min(m,n))
We need to keep a copy of base in each iteration, which takes O(min(m,n)) space.

*/

/*
Optimal approach:

Since both strings contains multiples of the identical segment base, their concatenation must be consistent, regardless of the order (str1 + str2 = str2 + str1). Therefore, we need to check if two concatenations made by str1 and str2 in both orders are the same. If they are not consistent, it means there is no divisible strings and we should return "" as required. Otherwise, there exists a GCD string of str1 and str2.

If the concatenation condition is met, the length of the largest possible segment that can divide both strings is determined by the GCD of their lengths. For example:
Suppose str1 has length 6 and str2 has length 9. The GCD of these lengths is 3.
This means that a repeating segment of length 3 is the largest possible segment that could divide both strings.


*/

const gcdOfStrings = function (str1, str2) {
  // Check if str1 and str2 can be constructed from a common divisor string
  // If the two concatenations differ, it indicates the two strings do not share a repeating base
  // => No GCD
  if (str1 + str2 !== str2 + str1) return '';

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const gcdLength = gcd(str1.length, str2.length);

  // str1 + str2 === str2 + str1
  return str1.substring(0, gcdLength);
};

/*

Time complexity: O(m+n)

We need to compare the two concatenations of length O(m+n), it takes O(m+n) time.
We calculate the GCD using binary Euclidean algorithm, it takes log(m⋅n) time.
To sum up, the overall time complexity is O(m+n).

Space complexity: O(m+n)
We need to compare the two concatenations of length O(m+n).

*/
