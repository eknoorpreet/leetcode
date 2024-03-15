/*

Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Example 1:


Input: head = [1,1,2]
Output: [1,2]
Example 2:


Input: head = [1,1,2,3,3]
Output: [1,2,3]


Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.

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

const deleteDuplicates = function(head) {
    let currentNode = head
    // As long as the node exists
    while(currentNode) {
        // It's sorted, so compare with the next one
        // If they are duplicates
        if(currentNode.next && currentNode.val === currentNode.next.val) {
            // Link currentNode to its next's next
            currentNode.next = currentNode.next.next
        } else {
            // Else, move on to the next node
            currentNode = currentNode.next
        }
    }
    // Return the list
    return head;
}

//TC: O(n)
//SC: O(1)
