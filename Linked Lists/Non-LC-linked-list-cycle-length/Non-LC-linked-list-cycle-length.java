/*Given the head of a LinkedList with a cycle, find the length of the cycle.*/

class ListNode {
  int val;
  ListNode next;
  ListNode(int x) {
      val = x;
      next = null;
  }
}

class Solution {
  public int calculateCycleLength(ListNode node) {
    ListNode current = node;
    int length = 0;
    while(true) {
      current = current.next;
      length++;
      if(current == node) {
        break;
      }
    }
    return length;
  }

  public int findCycleLength(ListNode head) {
      ListNode slow = head;
      ListNode fast = head;
      while(fast != null && fast.next != null) {
          slow = slow.next;
          fast = fast.next.next;
          if(slow == fast) {
              return calculateCycleLength(slow);
          }
      }
      return 0;
  }
}

/*Time Complexity: Once the slow pointer enters the cycle, the fast pointer will meet the
slow pointer in the same loop. Therefore, the time complexity of our algorithm will be O(n)
where n is the number of nodes in the LinkedList.

Space Complexity: Constant space O(1). */
