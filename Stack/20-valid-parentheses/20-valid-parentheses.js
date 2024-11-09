//https://leetcode.com/problems/valid-parentheses/description/

/*Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.

Open brackets must be closed in the correct order.

Every close bracket has a corresponding open bracket of the same type.

*/

/**
 * @param {string} s
 * @return {boolean}
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
      nodes.push(currentNode);
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
/*

Intuition: Using a stack to track open parens and process them (pop off when found a closing match)

*/

const isValid0 = function (s) {
  const map = new Map();
  //order matters =>
  //a closing parens needs to be matched to the latest opened parens
  //LIFO => stack
  const stack = new Stack();
  //hashmap of matching parens ('value' closes the 'key' parens)
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  for (let i = 0; i < s.length; i++) {
    //determine if it's an opening parens
    if (map.has(s[i])) {
      //push it on top of the stack (most-recently opened parens)
      stack.push(s[i]);
    } else {
      //it's a closing parens but check if we have something to close (stack's length)
      //(empty stack => balanced parens)
      //check if the current parens closes the last opened parens (stored on top of stack)
      const latestOpened = stack.peek()?.value;
      if (stack.length && s[i] === map.get(latestOpened)) {
        stack.pop();
      }
      //it's a closing parens but of a different kind => '(]' => invalid
      else return false;
    }
  }
  //all parens matched (stack empty) => valid
  if (!stack.length) return true;
  else return false;
};

// Same logic but more elegant code
const isValid = function (s) {
  const map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');

  const stack = new Stack();
  for (let i = 0; i < s.length; i++) {
    const currBracket = s[i];
    // If it's an opening bracket
    if (map.has(currBracket)) {
      // Push it on top of the stack (most-recently opened parens)
      stack.push(currBracket);
    } else if (stack.length === 0) {
      // Else, it's a closing bracket
      // If stack is empty => no opening bracket for the current closing bracket => invalid!
      return false;
    } else {
      // Stack is non-empty, get the last opened bracket
      const lastOpeningBracket = stack.pop();
      // Access its closing bracket
      const correspondingClosingBracket = map.get(lastOpeningBracket);
      // See if the current closing bracket matches. If not, false!
      // Otherwise, continue
      if (currBracket !== correspondingClosingBracket) {
        return false;
      }
    }
  }
  // Loop ends, stack still not empty? => brackets not closed/balanced => false
  if (stack.length !== 0) return false;
  return true;
};

//TC: O(n)
//SC: O(n) (stack could potentially be upto the input size)
