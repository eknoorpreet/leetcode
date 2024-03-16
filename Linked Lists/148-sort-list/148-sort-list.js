/*

Given the head of a linked list, return the list after sorting it in ascending order.



Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []


Constraints:

The number of nodes in the list is in the range [0, 5 * 10^4].
-10^5 <= Node.val <= 10^5


Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

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

const merge = function(list1, list2) {
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
    while(current1) {
        current3.next = current1
        current1 = current1.next
        current3 = current3.next
    }
    while(current2) {
        current3.next = current2
        current2 = current2.next
        current3 = current3.next
    }
    return list3.next
  };

  // Here, we don't just want the middle of the linked list!
  // The problem with just getting the middle node is that it will lead to stack overflow!
  // How? Consider [4,2,1,3]. First, it gets the mid [1, 3]. Next, it recursively calls sortList
  // again to get the left portion of the list but head is still [4,2,1,3]. Therefore,
  // we also want to lose the reference to the next nodes.
  //That means, we also need the node before mid (midPrev)
  const getMiddleNode = function(head) {
      // We set the slow pointer one step before head
      // So when fast reaches the end, slow pointer is one node before the middle node
      let midPrev = new ListNode(0, head) // (slow)
      let fast = head
      while(fast && fast.next) {
          midPrev = midPrev.next
          fast = fast.next.next
      }
      const mid = midPrev.next
      midPrev.next = null
      return mid
  };

  const sortList = function(head) {
      // Base condition: A null node or 1 node is always sorted!
      if(head === null || head.next === null) return head

      const mid = getMiddleNode(head)

      const left = sortList(head) // head = [4, 2], left = [2, 4]
      const right = sortList(mid) // mid = [1, 3], right = [1, 3]

      // Merge 2 sorted lists
      return merge(left, right)
  };


/*

Time complexity: O(n log n)

Space complexity: O(n)

*/
