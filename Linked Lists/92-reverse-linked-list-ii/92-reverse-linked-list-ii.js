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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

/*

Do it one step at a time.

1 -> 2 -> 3 -> 4 -> 5

1 -> 3 -> 2 -> 4 -> 5

1 -> 4 -> 3 -> 2 -> 5

*/

const reverseBetween0 = function(head, left, right) {
    let dummyHead = new ListNode(0, head)
    let nodeBeforeSublist = dummyHead

    // Get to the node before left
    let i = 0
    while(i !== left - 1) {
        nodeBeforeSublist = nodeBeforeSublist.next
        i++
    }

    let sublistPtr = nodeBeforeSublist.next // 2

    while(left !== right) {
        let nextNode = sublistPtr.next; //3, 4
        sublistPtr.next = nextNode.next; //2 -> 4 (cut out 3), 2 -> 5 (cut out 4)
        nextNode.next = nodeBeforeSublist.next; //3 -> 2
        nodeBeforeSublist.next = nextNode; //1 -> 4
        left++;
    }

    return dummyHead.next
};

/*

We already know how to reverse a linked list

nextNode = currentNode.next (Store this reference in order to move on to the next node)
currentNode.next = prevNode
prevNode = currentNode
currentNode = nextNode

We just need to do this in between given positions

1. Iterate till the (left - 1)th position. We need (left - 1)th node to link it it to the reversed sublist.

2. Perform the reversal

3. Link the node before sublist (left - 1) to the reversed sublist

*/

const reverseBetween = function(head, left, right) {
    let prev = null
    let currentNode = head

    // Get to the node before left
    let i = 0
    while(i !== left - 1 && currentNode) {
        prev = currentNode
        currentNode = currentNode.next
        i++
    }

    let nodeBeforeSublist = prev
    let sublistPtr = currentNode // first node in the sublist

    // Also take into account the node at (right + 1)th position
    while(currentNode && left !== right + 1) {
        let nextNode = currentNode.next
        currentNode.next = prev;
        prev = currentNode;
        currentNode = nextNode
        left++
    }

    // 1 <- 2 <- 3 <- 4 -> 5

    // sublistPtr is the first node in the sublist and after reversal,
    // it's pointing to the node before it, i.e. 2 -> 1
    // We need to link it to the node after the sublist ends (currentNode), i.e. 2 -> 5
    sublistPtr.next = currentNode

    // 1 4 -> 3 -> 2 -> 5

    if(nodeBeforeSublist !== null) {
        // Now, link the node before sublist to the reversed sublist
        // 1 -> 4 -> 3 -> 2 -> 5
        nodeBeforeSublist.next = prev
    } else {
        // If nodeBeforeSublist is null (nothing before the sublist),
        // that means the entire list was the sublist that had to be reversed
        // Just use the entire sublist (prev)
        head = prev
    }

    return head
};

//TC: O(n)
//SC: O(1)
