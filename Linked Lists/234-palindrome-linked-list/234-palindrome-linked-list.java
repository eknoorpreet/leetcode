// https://leetcode.com/problems/palindrome-linked-list/


/*

1. Find the middle of the linked list

2. Reverse the 2nd half of the linked list

3. Compare both halves

4. Re-reverse the 2nd half (Optional)

*/

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
  public boolean isPalindrome(ListNode head) {
      if(head == null || head.next == null)
          return true;
      ListNode middleNode = getMiddleNode(head);
      ListNode reversedHead = reverseLinkedList(middleNode);
      while(head != null && reversedHead != null) {
          if(head.val != reversedHead.val)
              return false;
          head = head.next;
          reversedHead = reversedHead.next;
      }
      return true;
  }
}

/*
Time complexity: O(n) where n is the number of nodes in the Linked List.

Space complexity: Constant space O(1).
*/
