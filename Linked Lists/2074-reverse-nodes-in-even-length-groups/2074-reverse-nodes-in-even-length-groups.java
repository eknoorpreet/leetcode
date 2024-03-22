/*

You are given the head of a linked list.

The nodes in the linked list are sequentially assigned to non-empty groups whose lengths form the sequence of the natural numbers (1, 2, 3, 4, ...). The length of a group is the number of nodes assigned to it. In other words,

The 1st node is assigned to the first group.
The 2nd and the 3rd nodes are assigned to the second group.
The 4th, 5th, and 6th nodes are assigned to the third group, and so on.
Note that the length of the last group may be less than or equal to 1 + the length of the second to last group.

Reverse the nodes in each group with an even length, and return the head of the modified linked list.



Example 1:


Input: head = [5,2,6,3,9,1,7,3,8,4]
Output: [5,6,2,3,9,1,4,8,3,7]
Explanation:
- The length of the first group is 1, which is odd, hence no reversal occurs.
- The length of the second group is 2, which is even, hence the nodes are reversed.
- The length of the third group is 3, which is odd, hence no reversal occurs.
- The length of the last group is 4, which is even, hence the nodes are reversed.
Example 2:


Input: head = [1,1,0,6]
Output: [1,0,1,6]
Explanation:
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 1. No reversal occurs.
Example 3:


Input: head = [1,1,0,6,5]
Output: [1,0,1,5,6]
Explanation:
- The length of the first group is 1. No reversal occurs.
- The length of the second group is 2. The nodes are reversed.
- The length of the last group is 2. The nodes are reversed.


Constraints:

The number of nodes in the list is in the range [1, 10^5].
0 <= Node.val <= 10^5

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
 * @return {ListNode}
 */

/*

1st group => 1 node => no reversal (index = 0)

2nd group => 2 nodes => reversal (index = 2)

3rd group => 3 nodes => no reversal

4th group => 4 nodes => reversal

5th group => 5 nodes => no reversal

...and so on.

We need to determine the start and end nodes of the sublist to be reversed

That is, which group it belongs to.

groupSize = 1 => traverse the 1st node, groupSize = 2

groupSize = 2 => traverse (and reverse) the 2nd and 3rd nodes, groupSize = 3

groupSize = 3 => traverse the next 3 nodes, groupSize = 4

groupSize = 4 => traverse (and reverse) the next 4 nodes, groupSize = 5

*/

class ListNode {
  int val;
  ListNode next;
  ListNode() {}
  ListNode(int val) { this.val = val; }
  ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
  public ListNode reverseEvenLengthGroups(ListNode head) {
      if(head == null || head.next == null || head.next == null)
          return head;
      ListNode currentNode = head;
      int group = 1;
      while(currentNode != null && currentNode.next != null) {
          group++;
          int groupSize = 0;
          ListNode temp = currentNode.next;
          while(temp != null && groupSize < group) {
              temp = temp.next;
              groupSize++;
          }
          if(groupSize % 2 == 0) {
              ListNode curr = currentNode.next;
              ListNode prev = null;
              int i = 0;
              while(i < groupSize) {
                  ListNode nextNode = curr.next;
                  curr.next = prev;
                  prev = curr;
                  curr = nextNode;
                  i++;
              }
              ListNode tail = currentNode.next;
              tail.next = curr;
              currentNode.next = prev;
              currentNode = tail;
          } else {
              int i = 0;
              while(i < groupSize) {
                  currentNode = currentNode.next;
                  i++;
              }
          }
      }
      return head;
  }
}

//TC: O(n)
//SC: O(1)
