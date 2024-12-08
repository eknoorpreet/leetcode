/*

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a
height-balanced
 binary search tree.



Example 1:


Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
Example 2:

Input: head = []
Output: []


Constraints:

The number of nodes in head is in the range [0, 2 * 10^4].
-10^5 <= Node.val <= 10^5

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

/*

Intuition:

Find the middle node of the linked list
Use this middle node as the root of the current subtree
Recursively construct left and right subtrees
(Similar to finding the middle of a linked list, but with an additional step of splitting the list)

Detailed:

The middle element of the given list would form the root of the binary search tree. All the elements to the left of the middle element would form the left subtree recursively. Similarly, all the elements to the right of the middle element will form the right subtree of the binary search tree (ensuring the height balance required in the resulting binary search tree).

Important: Disconnect the portion of the list to the left of the middle element by keeping a prev as well which points to one node before the slow i.e. prev.next = slow. For disconnecting the left portion we simply do prev.next = null

*/

const getMiddleNode = function (head) {
  // prev keeps track of the node before the middle node
  let prev = null;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  // Disconnect the portion of the list to the left of the middle element
  // (Break the list into two halves)
  if (prev !== null) prev.next = null;
  return slow;
};

const sortedListToBST0 = function (head) {
  if (head === null) return null;
  const mid = getMiddleNode(head);
  const root = new TreeNode(mid.val);
  // If the middle node is the entire list, return it as a single node
  if (head === mid) return root;
  // Recursively build left subtree from the first half of the list
  root.left = sortedListToBST(head);
  // Recursively build right subtree from the second half of the list
  root.right = sortedListToBST(mid.next);
  return root;
};

/*


Time Complexity: O(N log N)

Why O(N log N)?

We do O(N) work at each level (finding middle)
Number of levels is log N
Hence, total complexity is O(N log N)

Space Complexity: O(log N) for the recursion stack.
Each recursive call adds a frame to the call stack
Height of the balanced tree is log N
Maximum depth of recursion is log N

(Could have been O(N) for a skewed tree, but the question clearly states that we need to maintain the height balanced property)

*/

/*

Intuition:

You can get the time complexity down by using more space.

That's exactly what we're going to do in this approach. Essentially, we will convert the given linked list into an array and then use that array to form our binary search tree. In an array fetching the middle element is a O(1) operation and this will bring down the overall time complexity.

*/

const sortedListToBST1 = function (head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }

  const sortedArrayToBST = (left, right) => {
    // Stop condition when indices cross
    if (left > right) return null;
    // Find middle index
    const mid = left + Math.floor((right - left) / 2);
    // Create root node with middle element
    const root = new TreeNode(result[mid]);
    // Recursively build left subtree
    // Use elements from left to mid - 1
    root.left = sortedArrayToBST(left, mid - 1);
    // Recursively build right subtree
    // Use elements from mid + 1 to right
    root.right = sortedArrayToBST(mid + 1, right);
    return root;
  };
  return sortedArrayToBST(0, result.length - 1);
};

/*

Time Complexity: The time complexity comes down to just O(N) now since we convert the linked list to an array initially and then we convert the array into a BST. Accessing the middle element now takes O(1) time and hence the time complexity comes down.

Space Complexity: Since we used extra space to bring down the time complexity, the space complexity now goes up to O(N) as opposed to just O(logN) in the previous solution. This is due to the array we construct initially.

*/

/*

Intuition:

Elements processed in the inorder fashion on a binary search tree turn out to be sorted in ascending order. The reason we are able to use this idea in this problem is because we are given a sorted linked list initially.

We know that the leftmost element in the inorder traversal has to be the head of our given linked list. Similarly, the next element in the inorder traversal will be the second element in the linked list and so on. This is made possible because the initial list given to us is sorted in ascending order.

Algorithm:
1. Iterate over the linked list to find out its length.
2. Remember, we need to simulate the inorder traversal here. We can find out the index of the middle element by using (left + right) / 2 and make recursive calls on the two halves.
3. Recurse on the left half by using left, mid - 1 as the starting and ending points.
4. The invariance that we maintain in this algorithm is that whenever we are done building the left half of the BST, the head pointer in the linked list will point to the root node or the middle node (which becomes the root). So, we simply use the current value pointed to by head as the root node and progress the head node by once i.e. head = head.next
5. We recurse on the right hand side using mid + 1, right as the starting and ending points.

Detailed:

Purpose of head = head.next

Synchronized Traversal

The linked list is in sorted order
We want to create a BST in the same sorted order
Each time we create a node, we need to move to the next node in the list

1. Left Subtree Construction

First, recursively build the entire left subtree
This ensures all left nodes are processed first

2. Current Node as Root

Use current head value to create the root node
This node represents the middle of the current subtree

3. Head Advancement

After using the current node, move to the next node
This prepares for right subtree construction

*/

const sortedListToBST = function (head) {
  const getSize = (head) => {
    let curr = head;
    let size = 0;
    while (curr !== null) {
      curr = curr.next;
      size++;
    }
    return size;
  };

  const convertListToBST0 = (left, right) => {
    if (left > right) return null;
    const mid = left + Math.floor((right - left) / 2);
    // First, recursively build LEFT subtree
    const rootLeft = convertListToBST(left, mid - 1);
    // Create root node AFTER left subtree is complete
    const root = new TreeNode(head.val);
    // Attach left subtree
    root.left = rootLeft;
    // Move to next node in linked list
    // (Simulating inorder traversal in the linked list:
    // (left, move to head, right)
    head = head.next;
    // Build right subtree
    rootRight = convertListToBST(mid + 1, right);
    // Attach right subtree
    root.right = rootRight;
    return root;
  };

  const convertListToBST = (left, right) => {
    if (left > right) return null;
    const mid = left + Math.floor((right - left) / 2);
    const rootLeft = convertListToBST(left, mid - 1);
    const root = new TreeNode(head.val);
    root.left = rootLeft;
    head = head.next;
    const rootRight = convertListToBST(mid + 1, right);
    root.right = rootRight;
    return root;
  };
  const size = getSize(head);
  return convertListToBST(0, size - 1);
};

/*

Complexity Analysis

Time Complexity: The time complexity is still O(N) since we still have to process each of the nodes in the linked list once and form corresponding BST nodes.

Space Complexity: O(logN) since now the only extra space is used by the recursion stack and since we are building a height balanced BST, the height is bounded by logN.

*/
