/*

Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.



Example 1:


Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
Example 2:


Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]


Constraints:

The number of nodes in the linked list is in the range [0, 10^4].
-10^6 <= Node.val <= 10^6


*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const oddEvenList = function (head) {
  let oddList = new ListNode(0, head);
  let p1 = oddList;
  let evenList = new ListNode(0, head);
  let p2 = evenList;
  let currentNode = head;
  let i = 1;
  while (currentNode) {
    if (i % 2 !== 0) {
      p1.next = currentNode;
      p1 = p1.next;
    } else {
      p2.next = currentNode;
      p2 = p2.next;
    }
    currentNode = currentNode.next;
    i++;
  }
  p2.next = null;
  p1.next = evenList.next;
  return oddList.next;
};

// TC: O(n)
// SC: O(1)
