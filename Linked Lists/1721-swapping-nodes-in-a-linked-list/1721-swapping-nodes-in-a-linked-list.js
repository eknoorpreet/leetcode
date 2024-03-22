/*

You are given the head of a linked list, and an integer k.

Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).



Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Example 2:

Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]


Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 10^5
0 <= Node.val <= 100

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
 * @param {number} k
 * @return {ListNode}
 */

const swapNodes0 = function (head, k) {
  let dummy = new ListNode(null, head);
  let left = head; // Kth node of the Linked List
  let preLeft = dummy; // (K - 1)th node of the Linked List
  let right = head; // Kth node of the Linked List from the end
  let preRight = dummy; // (K - 1)th node of the Linked List List from the end

  for (let i = 0; i < k - 1; i++) {
    preLeft = left; // 1
    left = left.next; // 2
  }

  // Next: Find the right (and preRight) node

  // Start from the left
  let currentNode = left; // 2

  // iterate till the end of the list
  // Since we initiated right to head
  // and started iterating (currentNode) from the kth position
  // when currentNode reaches the end of the list,
  // 'right' will stop at kth position from the end
  while (currentNode.next) {
    preRight = right; // 3
    right = right.next; // 4
    currentNode = currentNode.next;
  }

  // Both nodes are the same? => No need to swap
  if (left === right) {
    return head;
  }

  preLeft.next = right; // 1 -> 4
  preRight.next = left; // 3 -> 2
  let temp = left.next; // 3
  left.next = right.next; // 2 -> 5
  right.next = temp; // 4 -> 3

  return dummy.next;
};

const swapNodes = function (head, k) {
  if (!head || !head.next) return head;
  let dummy = new ListNode(0, head);
  let preLeft = dummy;
  let left = head;
  let preRight = dummy;
  let right = head;

  let i = 0;
  while (i < k - 1) {
    preLeft = left;
    left = left.next;
    i++;
  }

  let currentNode = left;
  while (currentNode.next) {
    preRight = preRight.next;
    right = right.next;
    currentNode = currentNode.next;
  }

  preLeft.next = right; // 1 -> 4
  preRight.next = left; // 3 -> 2
  let nextLeft = left.next; // store 3
  left.next = right.next; // 2 -> 5
  right.next = nextLeft; // 4 -> 3

  return dummy.next;
};

// TC: O(n)
// SC: O(1)
