/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//rotate => shifting each element to right by k times (last ones will be looped back to front)
//pattern: How to cycle back in array? Each element => (i + k) % nums.length => always stays in array!
//i(4) + k(2) = 6 % 5 = index 1
const rotate = function (nums, k) {
  //k could be greater than array length
  //k = array.length => k % length = rotate 0 times (just return)
  if (k % nums.length === 0) return nums;
  //k > array.length => k (5) % length (4) = rotate 1 time

  //what if we have k = 101, then we will not rotate it 101 times. It simply means till 100 times it
  //will be [1,2,3,4,5,6,7] & we have to rotate only 1 time i.e. [7,1,2,3,4,5,6].
  k = k % nums.length;

  /*[1,2,3,4,5,6,7], k = -1
    Output : [2,3,4,5,6,7,1]
    
    k = -1 => k = 6. So, what It represent is that add the -ve value to the length of array.*/

  if (k < 0) {
    // if we get -ve value, then -ve is just equals to it's -ve + array.length
    k += nums.length;
  }

  //input arr = [1,2,3,4,5,6,7], k = 3
  //input arr into 2 portions:
  //part 1: [1,2,3,4], part 2: [5,6,7]
  reverse(nums, 0, nums.length - k - 1); //total - k elements (normal shifting) [1,2,3,4] => [4,3,2,1]
  reverse(nums, nums.length - k, nums.length - 1); //last k elements (moved to front) [5,6,7] => [7,6,5]
  reverse(nums, 0, nums.length - 1); //entire arr reversed => [4,3,2,1,7,6,5] => [5,6,7,1,2,3,4]
};

const reverse = (nums, i, j) => {
  let left = i; // left index;
  let right = j; // right index

  //until both pointers meet each other,
  while (left < right) {
    //swap both elements
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};

//TC: O(n)
//SC: O(1)
