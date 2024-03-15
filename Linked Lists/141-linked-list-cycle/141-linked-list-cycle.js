/*

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:


Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.


Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


Constraints:

The number of the nodes in the list is in the range [0, 10^4].
-10^5 <= Node.val <= 10^5
pos is -1 or a valid index in the linked-list.

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

//TC: O(n)
//SC: O(n)
const hasCycle0 = function(head) {
    // Keep track of visited nodes
    const visited = new Set()
    let current = head
    while(current) {
        if(!visited.has(current)) visited.add(current)
        else return true
        current = current.next
    }
    // current becomes null => Linked list ended (no cycle)
    // (list would never have ended in case of a cycle!)
    return false
}

const hasCycle = function(head) {
    let slow = head
    let fast = head
    while(fast !== null && fast.next !== null) {
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) return true
    }
    // If fast ever becomes null (loop finishes) => no cycle!
    return false
};

/*Time Complexity: Once the slow pointer enters the cycle, the fast pointer will meet the
slow pointer in the same loop. Therefore, the time complexity of our algorithm will be O(n)
where n is the number of nodes in the LinkedList.

Space Complexity: Constant space O(1). */
