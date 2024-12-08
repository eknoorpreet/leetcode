/*

Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.

We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.



Example 1:

Input: root = [4,2,5,1,3]

Output: [1,2,3,4,5]

*/

/**
 * // Definition for a _Node.
 * function _Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */

/*

After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor.

Predecessor:
The predecessor of a node is the node with the largest value that is smaller than the current node's value
In a BST, it's the node you would visit just before the current node in an in-order traversal
Visually, it's the node that comes directly before the current node when you traverse the tree in sorted order

Successor:
The successor of a node is the node with the smallest value that is larger than the current node's value
In a BST, it's the node you would visit just after the current node in an in-order traversal
Visually, it's the node that comes directly after the current node when you traverse the tree in sorted order

Key points:
The smallest element in the BST becomes the head of the DLL.
Each node points to its predecessor (left) and successor (right), and the list is circular (last connects to the first and vice versa).

Approach:
An in-order traversal of the BST, which naturally visits nodes in sorted order. Here's a conceptual strategy:

Perform an in-order traversal to process nodes in ascending order
While traversing, modify node connections to create the doubly-linked list
Establish circular connections at the end

In the context of converting a BST to a circular doubly-linked list:
The left pointer will point to the predecessor
The right pointer will point to the successor
This creates a list where each node knows its "previous" and "next" nodes in sorted order

*/

const treeToDoublyList0 = function (root) {
  if (!root) return null;

  // Track first and last nodes
  let first = null; // (Smallest) node , which becomes the head of the doubly linked list.
  let last = null; // Last processed node, which allows us to connect the current node to the last node.

  const inorder = (node) => {
    // Base case
    if (!node) return null;
    if (node) {
      // Traverse left subtree
      inorder(node.left);
      // Process current node (connections)
      if (last) {
        // Connect previous node with current node
        last.right = node;
        node.left = last;
      } else {
        // First node of the list
        first = node;
      }
      // Update last node
      last = node;
      // Traverse right subtree
      inorder(node.right);
    }
  };

  // Start in-order traversal
  inorder(root);

  // Connect first and last to make it circular
  last.right = first; // (last node's successor is the first node)
  first.left = last; // (first node's predecessor is the last node)
  // Return the pointer to the smallest element of the linked list.
  return first;
};

/*

Complexity Analysis

Time complexity : O(N) since each node is processed exactly once.

Space complexity : O(N). We have to keep a recursion stack of the size of the tree height, which is O(logN) for the best case of a completely balanced tree and O(N) for the worst case of a completely unbalanced tree.

*/
