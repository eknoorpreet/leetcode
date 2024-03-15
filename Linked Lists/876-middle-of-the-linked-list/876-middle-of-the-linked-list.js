// https://leetcode.com/problems/middle-of-the-linked-list

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

const middleNode0 = function(head) {
  let current = head
  let size = 0;
  while(current) {
      size++
      current = current.next
  }
  current = head
  let midPoint = Math.floor(size / 2)
  let index = 0
  while(index !== midPoint) {
      current = current.next
      index++
  }
  return current
}
// TC: O(n) (2-pass)
// SC: O(1)

const middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

middleNode([1, 2, 3, 4, 5]); //[3,4,5]
middleNode([1, 2, 3, 4, 5, 6]); //[4,5,6]

/*Time complexity: O(n) where n is the number of nodes in the LinkedList.

Space complexity: Constant space O(1). */
