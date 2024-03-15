/*Given the head of a LinkedList with a cycle, find the length of the cycle.*/

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

const findCycleLength = function (head) {
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

findCycleLength([3, 2, 0, -4]);

/*Time Complexity: Once the slow pointer enters the cycle, the fast pointer will meet the 
slow pointer in the same loop. Therefore, the time complexity of our algorithm will be O(n) 
where n is the number of nodes in the LinkedList.

Space Complexity: Constant space O(1). */
