/*

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.



Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]


Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

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
}

//TC: O(m + n)
//SC: O(m + n)
