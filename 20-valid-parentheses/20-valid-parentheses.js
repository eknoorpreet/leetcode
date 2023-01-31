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

//TC: O(n)
//SC: O(n) (stack could potentially be upto the input size)
// const isValid = function(s) {
//     const map = new Map()
//     //order matters =>
//     //a closing parens needs to be matched to the most recent opened parens
//     //LIFO => stack
//     const stack = new Stack()
//     //hashmap of matching parens ('key' closes the 'value' parens)
//     map.set(')', '(');
//     map.set('}', '{');
//     map.set(']', '[');
//     for(let i = 0; i < s.length; i++) {
//         //if it's a closing parens
//         if(map.has(s[i])) {
//             //make sure stack is non-empty
//             //empty stack => balanced parens
//             //Can't add closing parens to an empty stack
//             //check if the last parens we saw (stored on top ofin stack) was an opening parens for current
//             if(stack.length && stack.peek().value === map.get(s[i])) {
//                 stack.pop().value
//             }
//             //it's a closing parens but of a different kind => '(]' => invalid
//             else return false
//         } else {
//             //if we get an open parens
//push it on top of the stack (most-recently opened parens)
//             stack.push(s[i])
//         }
//     }
//     //all parens matched (stack empty) => valid
//     if(!stack.length) return true
//     else return false
// };

//TC: O(n)
//SC: O(n) (stack could potentially be upto the input size)
const isValid = function (s) {
  const map = new Map();
  //order matters =>
  //a closing parens needs to be matched to the most recent opened parens
  //LIFO => stack
  const stack = new Stack();
  //hashmap of matching parens ('value' closes the 'key' parens)
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');
  for (let i = 0; i < s.length; i++) {
    //if it's a open parens
    if (map.has(s[i])) {
      //push it on top of the stack (most-recently opened parens)
      stack.push(s[i]);
    } else {
      //make sure stack is non-empty
      //Can't add closing parens to an empty stack
      //bcoz empty stack => balanced parens
      //check if the last parens we saw (stored on top of stack) was an opening parens for current
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

//Time Complexity: O(n)
//Space Complexity: O(n)
