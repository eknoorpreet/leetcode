/*

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.



Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]


Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/*

Head of the linked lists (2 and 5) is where the addition starts

*/

const addTwoNumbers = function (l1, l2) {
  let dummyHead = new ListNode(0);
  let p1 = l1; // Pointer for list1
  let p2 = l2; // Pointer for list2
  let newListPtr = dummyHead; // Pointer for the new list
  let carry = 0;
  while (p1 || p2) {
    let num1 = p1 ? p1.val : 0;
    let num2 = p2 ? p2.val : 0;
    let sum = carry + num1 + num2;
    carry = Math.floor(sum / 10);
    newListPtr.next = new ListNode(sum % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    newListPtr = newListPtr.next;
  }
  // Edge case: 8 + 8 = 16. Both lists are done but we still have a carry (1)!
  // Just place it!
  if (carry > 0) {
    newListPtr.next = new ListNode(carry);
  }
  return dummyHead.next;
};

// TC: O(m + n)
// SC: O(1)
