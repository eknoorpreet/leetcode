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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

const mergeTwoLists = function(list1, list2) {
    let i = 0;
    let j = 0;
    const list3 = new ListNode(0, null)
    let current3 = list3
    let current1 = list1
    let current2 = list2
    while(current1 && current2) {
        if(current1.val <= current2.val) {
            current3.next = current1
            current1 = current1.next
        } else {
            current3.next = current2
            current2 = current2.next
        }
        current3 = current3.next
    }

    // One of the lists have been fully traversed
    // Insert the ones from the other list to the output list
    // If list 2 was fully traversed, insert nodes from list 1 (already in sorted order)
    while(current1) {
        current3.next = current1
        current1 = current1.next
        current3 = current3.next
    }
    // If list 1 was fully traversed, insert nodes from list 2 (already in sorted order)
    while(current2) {
        current3.next = current2
        current2 = current2.next
        current3 = current3.next
    }
    return list3.next
};

//TC: O(m + n)
//SC: O(m + n)
