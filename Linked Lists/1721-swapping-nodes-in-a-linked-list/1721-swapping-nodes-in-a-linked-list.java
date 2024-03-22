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

class ListNode {
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
  public ListNode swapNodes(ListNode head, int k) {
      if(head == null || head.next == null)
          return head;
      ListNode dummyHead = new ListNode(0, head);
      ListNode preLeft = dummyHead;
      ListNode left = head;
      ListNode preRight = dummyHead;
      ListNode right = head;

      int i = 0;
      while(i < k - 1) {
          preLeft = left;
          left = left.next;
          i++;
      }

      ListNode currentNode = left;

      while(currentNode.next != null) {
          preRight = right;
          right = right.next;
          currentNode = currentNode.next;
      }

      if(left == right)
          return head;

      preLeft.next = right;
      preRight.next = left;
      ListNode nextLeft = left.next;
      left.next = right.next;
      right.next = nextLeft;

      return dummyHead.next;
  }
}

// TC: O(n)
// SC: O(1)
