/**
 * @param {string[]} tokens
 * @return {number}
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

// var evalRPN = function(tokens) {
//     const stack = new Stack()
//     for(let c in tokens) {
//         if(c === '+') {
//             stack.push(stack.pop().value + stack.pop().value)
//         }
//         if(c === '-') {
//             const [a, b] = [stack.pop().value, stack.pop().value]
//             stack.push(b - a)
//         }
//         if(c === '*') {
//             stack.pop().value * stack.pop().value
//         }
//         if(c === '/') {
//             const [a, b] = [stack.pop().value, stack.pop().value]
//             stack.push(Math.floor(b / a))
//         }
//         //it's a number
//         else {
//             stack.push(Number(c))
//             console.log(stack)
//         }
//     }
//     return stack[0]
// };

//TC: O(n)
//SC: O(n)
var evalRPN = function (tokens) {
  const stack = [];
  for (let c of tokens) {
    if (c === '+') {
      //operator encountered => get last 2 nums from stack
      const a = stack.pop();
      const b = stack.pop();
      //compute, push to stack
      stack.push(a + b);
    } else if (c === '-') {
      //operator encountered => get last 2 nums from stack
      //according to the question, it should be b - a (2nd last - last)
      const a = stack.pop();
      const b = stack.pop();
      //compute, push to stack
      //subtraction order: b was pushed first, a later => b - a
      stack.push(b - a);
    } else if (c === '*') {
      //operator encountered => get last 2 nums from stack
      //compute, push to stack
      stack.push(stack.pop() * stack.pop());
    } else if (c === '/') {
      //operator encountered => get last 2 nums from stack
      //according to the question, it should be b / a (2nd last / last)
      const a = stack.pop();
      const b = stack.pop();
      //compute, push to stack
      //Math.floor(3/2) = 1 (rounds down)
      //Math.floor(-3/2) = -2 (rounds down)
      //Math.trunc(-3/2) = -1 (rounds toward 0)
      stack.push(Math.trunc(b / a)); //round toward 0
    }
    //it's a number
    else {
      //push a number to stack (after conversion from string)
      stack.push(Number(c));
    }
  }
  //only 1 number left (result)
  return stack[0];
};
