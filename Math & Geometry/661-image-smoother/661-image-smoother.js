/*

An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).


Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on each cell of it.



Example 1:


Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
Example 2:


Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138


Constraints:

m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255

*/

/**
 * @param {number[][]} img
 * @return {number[][]}
 */

const imageSmoother0 = function (img) {
  const rows = img.length;
  const cols = img[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let sum = 0;
      let count = 0;
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i < 0 || i === rows || j < 0 || j === cols) {
            continue;
          }
          sum += img[i][j];
          count++;
        }
      }
      result[row][col] = Math.floor(sum / count);
    }
  }
  return result;
};

// TC: O(mn)
// SC: O(mn)

const imageSmoother = function (img) {
  const rows = img.length;
  const cols = img[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  // Use the input array itself to store results
  // Store original value in higher bits, result in lower bits
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let sum = 0;
      let count = 0;

      // Check 3x3 window
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i < 0 || i === rows || j < 0 || j === cols) {
            continue;
          }
          // Only get the first 8 bits
          sum += img[i][j] % 256;
          count++;
        }
      }
      // Store original value in higher bits (<<8) and new value in lower bits
      img[row][col] = img[row][col] ^ (Math.floor(sum / count) << 8);
    }
  }

  // Clean up - keep only the calculated values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      img[i][j] >>= 8;
    }
  }

  return img;
};

// TC: O(mn)
// SC: O(1)
