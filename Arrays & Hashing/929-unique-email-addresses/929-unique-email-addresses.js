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

const numUniqueEmails0 = function (emails) {
  const simplifyEmail = (email) => {
    const [localName, domainName] = email.split('@');
    const emailWithoutDots = localName.replaceAll('.', '');
    const firstPlusIndex = emailWithoutDots.indexOf('+');
    const simplifiedEmail =
      (firstPlusIndex !== -1
        ? emailWithoutDots.slice(0, firstPlusIndex)
        : emailWithoutDots) +
      '@' +
      domainName;
    return simplifiedEmail;
  };
  const obj = {};
  for (const email of emails) {
    const key = simplifyEmail(email);
    obj[key] ? obj[key].push(email) : (obj[key] = [email]);
  }
  return Object.keys(obj).length;
};

//Using a set (better since there's no need to map to anything!)
const numUniqueEmails = function (emails) {
  const set = new Set();
  const simplifyEmail = (email) => {
    const [localName, domainName] = email.split('@');
    const emailWithoutDots = localName.replaceAll('.', '');
    const firstPlusIndex = emailWithoutDots.indexOf('+');
    const simplifiedEmail =
      (firstPlusIndex !== -1
        ? emailWithoutDots.slice(0, firstPlusIndex)
        : emailWithoutDots) +
      '@' +
      domainName;
    return simplifiedEmail;
  };
  for (const email of emails) {
    set.add(simplifyEmail(email));
  }
  return set.size;
};
