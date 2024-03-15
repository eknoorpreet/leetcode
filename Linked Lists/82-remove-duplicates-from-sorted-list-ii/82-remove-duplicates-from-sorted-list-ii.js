/*

Given the head of a sorted linked list, delete all nodes that have duplicate numbers,
leaving only distinct numbers from the original list. Return the linked list sorted as well.

Example 1:

Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Example 2:

Input: head = [1,1,1,2,3]
Output: [2,3]

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

const deleteDuplicates = (head) => {
    const dummy = new ListNode(0, head);
    // We don't just want to exclude the 2nd occurrence of duplicates
    // We want to remove ALL occurrences!
    // [1,2,3,3,4,4,5] => [1, 2, 5]
    // Therefore, a pointer to stop at the current unique value
    let previous = dummy;
    // A pointer to process the current node's next duplicate values
    // If there are duplicates to this node, we don't want to include this node!
    let current = head; // dummy.next

    // As long as the current node exists
    while (current) {
        let nextNode = current.next;
        let nodesSkipped = false // or duplicateFound
        // And the next exists and they are duplicates
        // Skip all duplicate nodes
        while (nextNode && current.val === nextNode.val) {
            nextNode = nextNode.next
            nodesSkipped = true
        }

        // Alternatively, if(current.next === nextNode)
        // current.next is still nextNode?
        // => no duplicates => update previous to be current
        if (!nodesSkipped) {
            previous = current;
        } else {
            // else, duplicates => link previous to nextNode
            // (which now has the next unique)
            previous.next = nextNode;
            // Since we are not including this node (as it has duplicates)
            // Lose the reference!
            // current = null;
        }
        current = nextNode;
    }
    return dummy.next;
}

// TC: O(n)
// SC: O(1)
