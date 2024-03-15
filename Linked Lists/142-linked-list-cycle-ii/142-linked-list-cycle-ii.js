/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const calculateCycleLength = (slow) => {
  //start a current pointer equal to slow pointer
  let current = slow;
  let length = 0;
  while (true) {
    current = current.next;
    length++;
    //when current pointer is again equal to slow pointer => total length of cycle
    if (current === slow) break;
  }
  return length;
};

const findCycleAndCalculateLength = function (head) {
  let slow = head;
  let fast = head;
  //as long as fast has not reached the end (if it exists)
  while (fast !== null && fast.next !== null) {
    //move the pointer by 2 steps
    fast = fast.next.next;
    //move the pointer by 1 step
    slow = slow.next;
    //eventually they meet => cycle exists!
    if (slow === fast) return calculateCycleLength(slow);
  }
  //end reached => no cycle => length = 0
  return 0;
};

const detectCycle = function (head) {
  let p1 = head;
  let p2 = head;
  let cycleLength = findCycleAndCalculateLength(head);
  if (cycleLength === 0) return null;
  // Run a pointer to the distance of the cycle
  while (cycleLength > 0) {
    p2 = p2.next;
    cycleLength--;
  }
  // Let's say p2 is into k of the length of the cycle (l)
  // Remaining to cover = l - k
  // Now, p1 and p2 are now at the same distance (l - k) from the starting node of the cycle.
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  //eventually they meet => starting node of cycle
  return p1;
};

detectCycle([3, 2, 0, -4]); //Output: tail connects to node index 1

/* Time Complexity: Finding the cycle in a LinkedList with n nodes and finding the length of the cycle: O(n).
Also, as we saw in the above algorithm, we will need O(n) to find the start of the cycle.
Therefore, the overall time complexity of our algorithm will be O(n).

Space Complexity: Constant space O(1). */
