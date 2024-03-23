/*

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.



Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []


Constraints:

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 10^4.

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
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
  public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
      ListNode list3 = new ListNode(0, null);
      ListNode current3 = list3;
      while(list1 != null && list2 != null) {
          if(list1.val < list2.val) {
              current3.next = list1;
              list1 = list1.next;
          } else {
              current3.next = list2;
              list2 = list2.next;
          }
          current3 = current3.next;
      }
      while(list1 != null) {
          current3.next = list1;
          list1 = list1.next;
          current3 = current3.next;
      }
      while(list2 != null) {
          current3.next = list2;
          list2 = list2.next;
          current3 = current3.next;
      }
      return list3.next;
  }

  public ListNode mergeKLists(ListNode[] lists) {
      if(lists.length == 0)
          return null;
      while(lists.length > 1) {
          ListNode[] mergedLists = new ListNode[(lists.length + 1) / 2];
          int index = 0;
          for(int i = 0; i < lists.length; i += 2) {
              ListNode list1 = lists[i];
              ListNode list2 = i + 1 < lists.length ? lists[i + 1] : null;
              mergedLists[index++] = mergeTwoLists(list1, list2);
          }
          lists = mergedLists;
      }
      return lists[0];
  }
}

// TC: O(n * log k)
// SC: O(1)
