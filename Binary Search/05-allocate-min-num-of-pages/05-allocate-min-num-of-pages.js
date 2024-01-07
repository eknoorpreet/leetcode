/*

Given that there are N books and M students. Also given are the number of pages in each book in ascending order. The task is to assign books in such a way that the maximum number of pages assigned to a student is minimum, with the condition that every student is assigned to read some consecutive books. Print that minimum number of pages.

Example :

Input: N = 4, pages[] = {12, 34, 67, 90}, M = 2

Output: 113

Explanation: There are 2 number of students. Books can be distributed in following combinations:

[12] and [34, 67, 90] -> Max number of pages is allocated to student ‘2’ with 34 + 67 + 90 = 191 pages
[12, 34] and [67, 90] -> Max number of pages is allocated to student ‘2’ with 67 + 90 = 157 pages
[12, 34, 67] and [90] -> Max number of pages is allocated to student ‘1’ with 12 + 34 + 67 = 113 pages
Of the 3 cases, Option 3 has the minimum pages = 113.

*/

/*

Brute-force Approach: The simplest approach to solve this problem is to find all permutations
to distribute N books among M students, and return the minimum page allocation among them.

*/

const isAllocationPossible = (arr, mid, m) => {
  let studentCount = 1;
  let totalPagesAllocated = 0;
  for (let pages of arr) {
    totalPagesAllocated += pages;
    // If current student cannot read totalPagesAllocated
    if (totalPagesAllocated > mid) {
      // Reset totalPagesAllocated for the new student (new student will start reading from here)
      totalPagesAllocated = pages;
      // Assign new student
      studentCount++;
    }
  }
  return studentCount <= m;
};

const allocateMinPages = function (arr, m, n) {
  if (m > n) return -1;
  let low = 0;
  let high = 0;
  let result = 0;

  // Setting up the range
  for (let num of arr) {
    low = Math.max(low, num);
    high += num;
  }

  // [low...high] => sorted range => binary search
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isAllocationPossible(arr, mid, m)) {
      // found potential answer
      result = mid;
      // try to minimize it
      high = mid - 1;
    } else {
      // We're requiring another student => increase the load for pages to be finished by only 2 students
      low = mid + 1;
    }
  }
  return result;
};

console.log(allocateMinPages([20, 10, 30, 40], 3)); // 40
