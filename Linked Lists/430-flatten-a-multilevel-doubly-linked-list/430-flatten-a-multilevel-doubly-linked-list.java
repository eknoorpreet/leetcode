/*

You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional child pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure as shown in the example below.

Given the head of the first level of the list, flatten the list so that all the nodes appear in a single-level, doubly linked list. Let curr be a node with a child list. The nodes in the child list should appear after curr and before curr.next in the flattened list.

Return the head of the flattened list. The nodes in the list must have all of their child pointers set to null.



Example 1:


Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
Explanation: The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:

Example 2:


Input: head = [1,2,null,3]
Output: [1,3,2]
Explanation: The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:

Example 3:

Input: head = []
Output: []
Explanation: There could be empty list in the input.


Constraints:

The number of Nodes will not exceed 1000.
1 <= Node.val <= 10^5

*/

/**
 * @param {Node} head
 * @return {Node}
 */

class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};

class Solution {
  public Node flatten(Node head) {
      if(head == null)
          return head;
      Node currentNode = head;
      while(currentNode != null) {
          if(currentNode.child == null) {
              currentNode = currentNode.next;
          } else {
              Node childNode = currentNode.child;
              Node nextNode = currentNode.next;
              while(childNode.next != null) {
                  childNode = childNode.next;
              }
              childNode.next = nextNode;
              if(nextNode != null) nextNode.prev = childNode;
              currentNode.next = currentNode.child;
              currentNode.child.prev = currentNode;
              currentNode.child = null;
          }
      }
      return head;
  }
}

/*

Time Complexity: The time complexity of the iterative version is O(n), where n is the number of nodes in the
linked list. This is because in the worst case, we might need to traverse through all the
nodes in the list once to flatten it.

Space Complexity: The space complexity of the iterative version is O(1) since we are not
using any extra space that grows with the input size.

*/

