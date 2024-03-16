/*

Given the head of a singly linked list, reverse the list, and return the reversed list.


Example 1:

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]


Example 2:

Input: head = [1,2]
Output: [2,1]


Example 3:

Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000


Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

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

// Recursive
const reverseList1 = function(head) {
    if(!head || !head.next) return head
    // Recursively go to the next node (and reach the last node)
    const reversedList = reverseList(head.next)
    // Link the next node's (head.next) next to its prev (head)
    // 5 -> 4
    head.next.next = head
    // Set the next node's next pointer to null to avoid cycles in the reversed list
    // 4 -> null (Very Important! Otherwise, it's 5 -> 4 and 4 -> 5)
    head.next = null
    return reversedList
}
// TC: O(n)
// SC: O(n)

// Iterative
const reverseList = function(head) {
    let currentNode = head
    let prevNode = null
    while(currentNode) {
        // Store the next reference in order to move ahead!
        const nextNode = currentNode.next
        currentNode.next = prevNode
        prevNode = currentNode
        currentNode = nextNode
    }
    return prevNode
}
// TC: O(n)
// SC: O(1)
