/*

Given the head of a linked list, return the list after sorting it in ascending order.



Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []


Constraints:

The number of nodes in the list is in the range [0, 5 * 10^4].
-10^5 <= Node.val <= 10^5


Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

*/

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode getMiddleNode(ListNode head) {
        ListNode midPrev = new ListNode(0, head);
        ListNode fast = head;

        while(fast != null && fast.next != null) {
            midPrev = midPrev.next;
            fast = fast.next.next;
        }
        ListNode mid = midPrev.next;
        midPrev.next = null;
        return mid;
    }

    public ListNode merge(ListNode list1, ListNode list2) {
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

    public ListNode sortList(ListNode head) {
        if(head == null || head.next == null)
            return head;

        ListNode mid = getMiddleNode(head);
        ListNode left = sortList(head);
        ListNode right = sortList(mid);

        return merge(left, right);
    }
}

/*

Time complexity: O(n log n)

Space complexity: O(n)

*/
