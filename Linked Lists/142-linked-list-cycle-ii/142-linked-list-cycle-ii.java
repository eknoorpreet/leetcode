 class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
 }

 class Solution {
  public int calculateLength(ListNode node) {
      ListNode current = node;
      int length = 0;
      while(true) {
          current = current.next;
          length++;
          if(current == node) break;
      }
      return length;
  }

  public int findCycleAndCalculateLength(ListNode node) {
      ListNode slow = node;
      ListNode fast = node;
      while(fast != null && fast.next != null) {
          slow = slow.next;
          fast = fast.next.next;
          if(slow == fast) return calculateLength(slow);
      }
      return 0;
  }

  public ListNode detectCycle(ListNode head) {
      ListNode p1 = head;
      ListNode p2 = head;
      int cycleLength = findCycleAndCalculateLength(head);
      if(cycleLength == 0) {
          return null;
      }
      while(cycleLength > 0) {
          p1 = p1.next;
          cycleLength--;
      }
      while(p1 != p2) {
          p1 = p1.next;
          p2 = p2.next;
      }
      return p1;
  }
}

/* Time Complexity: Finding the cycle in a LinkedList with n nodes and finding the length of the cycle: O(n).
Also, as we saw in the above algorithm, we will need O(n) to find the start of the cycle.
Therefore, the overall time complexity of our algorithm will be O(n).

Space Complexity: Constant space O(1). */
