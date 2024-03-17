// https://leetcode.com/problems/reorder-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
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
 * @return {void} Do not return anything, modify head in-place instead.
 */

/*

Approach:

Let's say we had two pointers, start and end, at both ends. We connect start -> end,
increment start by 1, decrement end by 1:

start -> end -> start + 1 -> end - 1

But we can't move end back in a singly linked list!

So, we can just reverse the second half of the linked list!

*/

const getMiddleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

const reverseLinkedList = function (head) {
  if (!head || !head.next) return head;
  let currentNode = head;
  console.log('in rev', currentNode);
  let prev = null;
  while (currentNode) {
    let nextNode = currentNode.next;
    currentNode.next = prev;
    prev = currentNode;
    currentNode = nextNode;
  }
  return prev;
};

const reorderList = function (head) {
  const middleNode = getMiddleNode(head);
  let reversedSecondHalf = reverseLinkedList(middleNode);
  let firstHalf = head;
  while (firstHalf && reversedSecondHalf) {
    let nextNode = firstHalf.next; // Stored 3
    firstHalf.next = reversedSecondHalf; // 2 -> 4
    firstHalf = nextNode; // 3

    nextNode = reversedSecondHalf.next; // Stored 3
    reversedSecondHalf.next = firstHalf; // 4 -> 3
    reversedSecondHalf = nextNode; // 3
  }
  // Here, it's 1 -> 4 -> 2 -> 3 -> 3 (cycle!)
  // Set the next pointer of the last node in the reordered list to null

  // If firstHalf is not null, it means that the list has an odd number of nodes,
  // and firstHalf is pointing to the last node in the first half of the
  // reordered list.
  // In a properly reordered list, the last node of the first half should
  // point to null, as it becomes the end of the reordered list.
  if (firstHalf !== null) firstHalf.next = null;
};

/*Time Complexity: O(n) where n is the number of nodes in the LinkedList.

Space Complexity: Constant space O(1). */
