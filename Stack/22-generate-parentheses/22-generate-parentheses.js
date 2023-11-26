//Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

/*Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"] */

/**
 * @param {number} n
 * @return {string[]}
 */

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  //prepend (at head)
  push(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.last = newNode;
    } else {
      newNode.next = this.first;
    }
    this.first = newNode;
    return ++this.length;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.first;
    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  pop() {
    const removedNode = this.first;
    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.length--;
    return removedNode.value;
  }

  peek() {
    return this.first;
  }
}

const generateParenthesis = function (n) {
  //need to generate all combinations of well-formed parentheses
  //undoing (backtracking from) / redoing an action => stack
  const stack = new Stack();
  const result = [];
  const backtrack = (openN, closeN) => {
    //base case n is the limit
    if (openN === closeN && closeN === n) {
      //here, since we implemented stack as a linked list, we're pushing each character as the
      //new head of the list => ')))(((' => reverse it
      //if stack was implemented as an array, we push/pop from the end => '((()))' => no need to reverse!
      result.push(stack.toArray().reverse().join(''));
      return;
    }

    //we can add more open parens as long as open parens < n
    //// (((()) => invalid (exceeds n)
    if (openN < n) {
      stack.push('(');
      backtrack(openN + 1, closeN);
      //backtracking done => remove the parens we just added
      stack.pop();
    }
    //we can add more closing parens as long as closing parens < open
    // ()) => invalid (even though closeN < n)
    if (closeN < openN) {
      stack.push(')');
      backtrack(openN, closeN + 1);
      //backtracking done => remove the parens we just added
      stack.pop();
    }
  };
  backtrack(0, 0);
  return result;
};

const generateParenthesisViaStackArray = function (n) {
  //need to generate all combinations of well-formed parentheses
  //undoing (backtracking from) / redoing an action => stack
  const stack = [];
  const result = [];
  const backtrack = (openN, closeN) => {
    //base case n is the limit
    if (openN === closeN && closeN === n) {
      result.push(stack.join(''));
      return;
    }

    //we can add more open parens as long as open parens < n
    //// (((()) => invalid (exceeds n)
    if (openN < n) {
      stack.push('(');
      backtrack(openN + 1, closeN);
      //backtracking done => remove the parens we just added
      stack.pop();
    }
    //we can add more closing parens as long as closing parens < open
    // ()) => invalid (even though closeN < n)
    if (closeN < openN) {
      stack.push(')');
      backtrack(openN, closeN + 1);
      //backtracking done => remove the parens we just added
      stack.pop();
    }
  };
  backtrack(0, 0);
  return result;
};

/*

Time Complexity:
The backtracking algorithm explores all possible combinations of well-formed parentheses.
At each step, it has two choices: either to add an open parenthesis or a close parenthesis.
In the worst case, the algorithm explores 2^n combinations, where n is the given input.
Therefore, the time complexity is O(2^n).
Space Complexity:
The space complexity is determined by the space used in the recursion stack and the stack data structure.
In the worst case, the recursion stack can go as deep as 2n (when openN and closeN both reach n), contributing to O(n) space.
The stack data structure is used to keep track of the current combination, and its maximum size is 2n in the worst case (when all open and close parentheses are pushed onto the stack).
Therefore, the overall space complexity is O(n).

*/
