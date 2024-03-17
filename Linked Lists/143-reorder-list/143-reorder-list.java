// https://leetcode.com/problems/reorder-list/

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

 class Solution {
  public ListNode getMiddleNode(ListNode node) {
      ListNode slow = node;
      ListNode fast = node;
      while(fast != null && fast.next != null) {
          slow = slow.next;
          fast = fast.next.next;
      }
      return slow;
  }

  public ListNode reverseLinkedList(ListNode node) {
      ListNode currentNode = node;
      ListNode prev = null;
      while(currentNode != null) {
          ListNode nextNode = currentNode.next;
          currentNode.next = prev;
          prev = currentNode;
          currentNode = nextNode;
      }
      return prev;
  }

  public void reorderList(ListNode head) {
      if(head == null || head.next == null)
          return;
      ListNode middleNode = getMiddleNode(head);
      ListNode reversedSecondHalf = reverseLinkedList(middleNode);
      ListNode firstHalf = head;
      while(firstHalf != null && reversedSecondHalf != null) {
          ListNode nextNode = firstHalf.next;
          firstHalf.next = reversedSecondHalf;
          firstHalf = nextNode;

          nextNode = reversedSecondHalf.next;
          reversedSecondHalf.next = firstHalf;
          reversedSecondHalf = nextNode;
      }
      if(firstHalf != null)
          firstHalf.next = null;
  }
}

/*Time Complexity: O(n) where n is the number of nodes in the LinkedList.

Space Complexity: Constant space O(1). */
