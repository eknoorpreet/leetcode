/*

Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.


Example 1:

Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]


Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]


Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n


Follow up: Could you do it in one pass?

*/

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseBetween0(ListNode head, int left, int right) {
        ListNode dummyHead = new ListNode(0, head);
        ListNode nodeBeforeSublist = dummyHead;

        int i = 0;
        while(i != left - 1 && nodeBeforeSublist != null) {
            nodeBeforeSublist = nodeBeforeSublist.next;
            i++;
        }

        ListNode sublistPtr = nodeBeforeSublist.next;

        while(left != right) {
            ListNode nextNode = sublistPtr.next;
            sublistPtr.next = nextNode.next;
            nextNode.next = nodeBeforeSublist.next;
            nodeBeforeSublist.next = nextNode;
            left++;
        }

        return dummyHead.next;
    }

    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode prev = null;
        ListNode currentNode = head;

        int i = 0;
        while(i != left - 1 && currentNode != null) {
            prev = currentNode;
            currentNode = currentNode.next;
            i++;
        }

        ListNode nodeBeforeSublist = prev;
        ListNode sublistPtr = currentNode;

        while(left != right + 1 && currentNode != null) {
            ListNode nextNode = currentNode.next;
            currentNode.next = prev;
            prev = currentNode;
            currentNode = nextNode;
            left++;
        }

        if(nodeBeforeSublist != null) {
            nodeBeforeSublist.next = prev;
        } else {
            head = prev;
        }

        sublistPtr.next = currentNode;
        return head;
    }
}

//TC: O(n)
//SC: O(1)
