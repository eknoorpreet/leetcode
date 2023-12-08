/*

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

The canonical path should have the following format:

The path starts with a single slash '/'.
Any two directories are separated by a single slash '/'.
The path does not end with a trailing '/'.
The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')
Return the simplified canonical path.



Example 1:

Input: path = "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.
Example 2:

Input: path = "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
Example 3:

Input: path = "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.


Constraints:

1 <= path.length <= 3000
path consists of English letters, digits, period '.', slash '/' or '_'.
path is a valid absolute Unix path.

*/

/**
 * @param {string} path
 * @return {string}
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

const simplifyPath0 = function (path) {
  const stack = new Stack();
  let curr = ''; //path we built so far (after last "/")
  for (const c of `${path}/`) {
    if (c === '/') {
      //is the path we built so far = ".."?
      if (curr === '..') {
        //make sure stack is non-empty: if path = "/..", can't go out
        //of the root dir
        // "/abc/.." => pop() => remove 'abc'
        if (stack.length) stack.pop();
        //ignore "." or "" (don't push to stack)
        //path built so far could be "" if we have multiple
        //consecutive slashes
      } else if (curr !== '' && curr !== '.') {
        stack.push(curr);
      }
      curr = '';
    } else {
      //build file name
      curr += c;
    }
  }
  return `/${stack.toArray().reverse().join('/')}`;
};

const simplifyPath = function (path) {
  const stack = [];
  let result = '';
  // "." => curr dir => just ignore
  const pathArr = path.split('/').filter((c) => c !== '' && c !== '.');
  console.log(pathArr);

  for (const c of pathArr) {
    // Encounter a ".." => pop! (go above one level)
    if (stack.length && c === '..') stack.pop();
    // if stack is empty (we just started), ignore ".." as we can't go outside root dir
    else if (c !== '..') stack.push(c);
  }
  //stack = ["home", "foo"]
  result += '/' + stack.join('/');

  // if no directory or file is present
  if (result.length == 0) return '/';
  return result;
};

//TC: O(n)
//SC: O(n)
