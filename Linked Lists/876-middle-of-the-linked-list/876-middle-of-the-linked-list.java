// https://leetcode.com/problems/middle-of-the-linked-list



class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 }

 class Solution {
  public ListNode middleNode(ListNode head) {
      ListNode slow = head;
      ListNode fast = head;
      while(fast != null && fast.next != null) {
          slow = slow.next;
          fast = fast.next.next;
      }
      return slow;
  }
}

/*Time complexity: O(n) where n is the number of nodes in the LinkedList.

Space complexity: Constant space O(1). */
