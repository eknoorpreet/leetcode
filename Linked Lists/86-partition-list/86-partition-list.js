/*

Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

You should preserve the original relative order of the nodes in each of the two partitions.



Example 1:


Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
Example 2:

Input: head = [2,1], x = 2
Output: [1,2]


Constraints:

The number of nodes in the list is in the range [0, 200].
-100 <= Node.val <= 100
-200 <= x <= 200

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
 * @param {number} x
 * @return {ListNode}
 */

/*

[1,4,3,2,5,2], x = 3

=> [1,2,2,4,3,5]

*Maintain the original relative order!

*/

const partition = function (head, x) {
  if (!head || !head.next) return head;
  let list1 = new ListNode(0, head); // A list for nodes < x
  let p1 = list1; // A pointer for list1
  let list2 = new ListNode(0, head); // A list for nodes >= x
  let p2 = list2; // A pointer for list2
  let currentNode = head;

  while (currentNode) {
    if (currentNode.val < x) {
      p1.next = currentNode;
      p1 = p1.next;
    } else {
      p2.next = currentNode;
      p2 = p2.next;
    }
    currentNode = currentNode.next;
  }
  // List 2 might have any references to a node in list 1, leading to a cycle!
  p2.next = null;
  // Link the end of list 1 (p1) to the beginning of list 2 (list2.next)
  p1.next = list2.next;
  return list1.next;
};

// TC: O(n)
// SC: O(1)
