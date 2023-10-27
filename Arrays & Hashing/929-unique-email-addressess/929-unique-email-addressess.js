/*

Every valid email consists of a local name and a domain name, separated by the '@' sign. Besides lowercase letters, the email may contain one or more '.' or '+'.

For example, in "alice@leetcode.com", "alice" is the local name, and "leetcode.com" is the domain name.
If you add periods '.' between some characters in the local name part of an email address, mail sent there will be forwarded to the same address without dots in the local name. Note that this rule does not apply to domain names.

For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address.
If you add a plus '+' in the local name, everything after the first plus sign will be ignored. This allows certain emails to be filtered. Note that this rule does not apply to domain names.

For example, "m.y+name@email.com" will be forwarded to "my@email.com".
It is possible to use both of these rules at the same time.

Given an array of strings emails where we send one email to each emails[i], return the number of different addresses that actually receive mails.



Example 1:

Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.
Example 2:

Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3


Constraints:

1 <= emails.length <= 100
1 <= emails[i].length <= 100
emails[i] consist of lowercase English letters, '+', '.' and '@'.
Each emails[i] contains exactly one '@' character.
All local and domain names are non-empty.
Local names do not start with a '+' character.
Domain names end with the ".com" suffix.

*/

/**
 * @param {string[]} emails
 * @return {number}
 */

// const numUniqueEmails = function(emails) {
//     for(let i = 0; i < emails.length; i++) {
//         const findDomainIndex = emails[i].indexOf("@")
//         const localName = emails[i].slice(0, findDomainIndex)
//         const domainName = emails[i].slice(findDomainIndex)
//         const findPlusIndex = localName.indexOf("+")
//         const simplifiedEmail = findPlusIndex !== -1 ? localName.slice(0, findPlusIndex).replaceAll(".", "") + domainName : localName.replaceAll(".", "") + domainName
//         emails[i] = simplifiedEmail
//         console.log(simplifiedEmail)
//     }
//     console.log(emails)
//     const set = new Set([...emails])
//     return set.size;
// };

const numUniqueEmails = function (emails) {
  //a set to store unique emails
  const set = new Set();
  const simplifyEmail = (email) => {
    //separate the local and domain names: O(1)
    const [localName, domainName] = email.split('@');
    //remove the dots from local name: O(k), where k is the maximum length of a local name in the array.
    const localNameWithoutDots = localName.replaceAll('.', '');
    //find the plus index: O(k)
    const firstPlusIndex = localNameWithoutDots.indexOf('+');
    //use the local name before '+' (ignore the local name after '+) and '@' and domain name
    //O(1): https://stackoverflow.com/questions/47733645/what-is-the-algorithmic-complexity-of-string-slicing-practical-real-world
    const simplifiedEmail =
      (firstPlusIndex !== -1
        ? localNameWithoutDots.slice(0, firstPlusIndex)
        : localNameWithoutDots) +
      '@' +
      domainName;
    return simplifiedEmail;
  };
  for (const email of emails) {
    //add all unique emails to the set
    set.add(simplifyEmail(email));
  }
  return set.size;
};

/*

Overall, the time complexity of this code is O(n * k), where 'n' is the number of elements
in the emails array, and 'k' is the maximum length of a local name in the array.

The space complexity of this code is O(n) in the worst case, where 'n' is the number of
elements in the emails array.
*/
