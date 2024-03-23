/*

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.



Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []


Constraints:

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 10^4.

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

const mergeTwoLists = function (list1, list2) {
  let i = 0;
  let j = 0;
  const list3 = new ListNode(0, null);
  let current3 = list3;
  let current1 = list1;
  let current2 = list2;
  while (current1 && current2) {
    if (current1.val <= current2.val) {
      current3.next = current1;
      current1 = current1.next;
    } else {
      current3.next = current2;
      current2 = current2.next;
    }
    current3 = current3.next;
  }
  while (current1) {
    current3.next = current1;
    current1 = current1.next;
    current3 = current3.next;
  }
  while (current2) {
    current3.next = current2;
    current2 = current2.next;
    current3 = current3.next;
  }
  return list3.next;
};

/*

As long as there are 2 lists, iterate and merge 2 lists at a time!

When all lists are merged, update the input array,
which might have 2 merged lists now! Merge them (since there are still  2lists!)

*/

const mergeKLists = function (lists) {
  if (!lists.length) return null;

  while (lists.length > 1) {
    const mergedLists = [];

    // Iterate over all the lists
    for (let i = 0; i < lists.length; i += 2) {
      // Pick the first and second lists
      let list1 = lists[i];
      let list2 = i + 1 < lists.length ? lists[i + 1] : null;

      // Merge them
      mergedLists.push(mergeTwoLists(list1, list2));
    }

    // Update the input array
    lists = mergedLists;
  }
  return lists[0];
};

// TC: O(n * log k)
// SC: O(1)
