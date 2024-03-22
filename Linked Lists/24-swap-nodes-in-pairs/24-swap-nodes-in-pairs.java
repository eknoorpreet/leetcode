/*

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)



Example 1:


Input: head = [1,2,3,4]
Output: [2,1,4,3]
Example 2:

Input: head = []
Output: []
Example 3:

Input: head = [1]
Output: [1]


Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100

*/

class ListNode {
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
  public ListNode reverseKGroup(ListNode head, int k) {
      if(head == null || k == 1)
          return head;

      ListNode headCopy = head;
      int size = 0;
      while(headCopy != null) {
          headCopy = headCopy.next;
          size++;
      }

      ListNode currentNode = head;
      ListNode prev = null;
      int numberOfReversals = (int)(size / k);

      while(numberOfReversals > 0) {
          ListNode nodeBeforeSublist = prev;
          ListNode sublistPtr = currentNode;

          int i = 0;
          while(currentNode != null && i < k) {
              ListNode nextNode = currentNode.next;
              currentNode.next = prev;
              prev = currentNode;
              currentNode = nextNode;
              i++;
          }
          sublistPtr.next = currentNode;

          if(nodeBeforeSublist != null) {
              nodeBeforeSublist.next = prev;
          } else {
              head = prev;
          }
          prev = sublistPtr;

          numberOfReversals--;
      }

      return head;
  }

  public ListNode swapPairs(ListNode head) {
      return reverseKGroup(head, 2);
  }
}

/*

Time Complexity:

The main part of the algorithm involves reversing each sublist of size k for a total of
numberOfReversals times. Reversing each sublist of size k takes O(k) time.
Therefore, the overall time complexity is O(n) + O(numberOfReversals × k).
But, numberOfReversals = n / k. So, numberOfReversals * k = n. Hence, overall O(n).

Space Complexity: O(1)

*/
