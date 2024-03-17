// https://leetcode.com/problems/palindrome-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */

const isPalindrome0 = function (head) {
  //reverse fn (to reverse the second half of linked list)
  const reverse = (head) => {
    let prevNode = null;
    let nextNode = null;
    while (head) {
      nextNode = head.next;
      head.next = prevNode;
      prevNode = head;
      head = nextNode;
    }
    return prevNode;
  };

  //list empty or just 1 element => palindrome!
  if (head === null && head.next === null) return true;
  let slow = head;
  let fast = head;
  //find middle node (to get the second half)
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  //slow = middle
  let secondHalf = reverse(slow); //second half reversed
  while (head !== null && secondHalf !== null) {
    //if at any point their val are not equal => return false (they won't be able to reach end)
    if (head.val !== secondHalf.val) return false;
    head = head.next;
    secondHalf = secondHalf.next;
  }
  //loop ended (they reached end) => palindrome!
  return true;
};

// Cleaner Code:

/*

1. Find the middle of the linked list

2. Reverse the 2nd half of the linked list

3. Compare both halves

4. Re-reverse the 2nd half (Optional)

*/

const reverseLinkedList = (node) => {
  let currentNode = node;
  let prev = null;
  while (currentNode) {
    const nextNode = currentNode.next;
    currentNode.next = prev;
    prev = currentNode;
    currentNode = nextNode;
  }
  return prev;
};

const getMiddleNode = function (node) {
  let slow = node;
  let fast = node;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

const isPalindrome = function (head) {
  if (head === null || head.next === null) return true;
  const middleNode = getMiddleNode(head);
  let reversedHead = reverseLinkedList(middleNode);
  while (head && reversedHead) {
    if (head.val !== reversedHead.val) return false;
    head = head.next;
    reversedHead = reversedHead.next;
  }
  return true;
};

isPalindrome([1, 2, 2, 1]); //true
isPalindrome([1, 2]); //false

/*
Time complexity: O(n) where n is the number of nodes in the Linked List.

Space complexity: Constant space O(1).
*/
