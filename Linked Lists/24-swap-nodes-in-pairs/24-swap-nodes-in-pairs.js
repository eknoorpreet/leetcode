/*

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)



Example 1:


Input: head = [1,2,3,4]
Output: [2,1,4,3]
Example 2:

Input: head = []
Output: []
Example 3:

Input: head = [1]
Output: [1]


Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100

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

const reverseKGroup = function (head, k) {
  if (!head || k === 1) return head;

  let prev = null;
  let currentNode = head;
  let headCopy = head;

  // Calculate size of the linked list
  let size = 0;
  while (headCopy) {
    headCopy = headCopy.next;
    size++;
  }

  // Calculate number of reversals
  let numberOfReversals = Math.floor(size / k);

  // Perform reversals for 'numberOfReversals' sublists
  while (numberOfReversals > 0) {
    let nodeBeforeSublist = prev;
    let sublistPtr = currentNode; // first node in the sublist

    let i = 0;
    while (currentNode && i < k) {
      let nextNode = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = nextNode;
      i++;
    }
    numberOfReversals--;

    // 1 <- 2 <- 3 <- 4 -> 5

    // sublistPtr is the first node in the sublist and after reversal,
    // it's still pointing to the node originally before it, i.e. 1 -> null
    // We need to link it to the node after the sublist ends (currentNode), i.e. 2 -> 5
    sublistPtr.next = currentNode;

    // 3 -> 2 -> 1 -> 4

    if (nodeBeforeSublist !== null) {
      // Now, link the node before sublist to the reversed sublist (prev)
      nodeBeforeSublist.next = prev;
    } else {
      // If nodeBeforeSublist is null (nothing before the sublist),
      // that means the entire list was the sublist that had to be reversed
      // OR the the sublist was at the beginning
      // Just use the entire sublist (prev)
      head = prev;
    }

    // sublistPtr is the last node of the reversed sublist
    // Set prev to sublistPtr to initiate the next sublist reversal
    prev = sublistPtr;
  }
  return head;
};

// Same as: https://leetcode.com/problems/reverse-nodes-in-k-group/
const swapPairs = function (head) {
  return reverseKGroup(head, 2);
};

/*

Time Complexity:

The main part of the algorithm involves reversing each sublist of size k for a total of
numberOfReversals times. Reversing each sublist of size k takes O(k) time.
Therefore, the overall time complexity is O(n) + O(numberOfReversals × k).
But, numberOfReversals = n / k. So, numberOfReversals * k = n. Hence, overall O(n).

Space Complexity: O(1)

*/
