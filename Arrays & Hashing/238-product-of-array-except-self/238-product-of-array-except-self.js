/*Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation. */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// TC:(O(n^2))
const getProduct = (arr, startIndex, endIndex) => {
  let product = 1;
  for (let i = startIndex; i < endIndex; i++) {
    product *= arr[i];
  }
  return product;
};

const productExceptSelf0 = (nums) => {
  let product = [];
  for (let i = 0; i < nums.length; i++) {
    product[i] = getProduct(nums, 0, i) * getProduct(nums, i + 1, nums.length);
  }
  return product;
};

// TC: O(n^2)
const productExceptSelf1 = (nums) => {
  let result = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    // for every index i
    for (let j = 0; j < nums.length; j++) {
      //except when i == j
      if (i === j) continue;
      //multiply all the elements at index j
      result[i] *= nums[j];
    }
  }
  return result;
};

/*

The key idea is to calculate products from both directions (left and right) and then combine them.
const result = [1,1,1,1]  // Final result array
const left = [1,1,1,1]    // Products of all elements to the left
const right = [1,1,1,1]   // Products of all elements to the right

Advantages over the brute-force approach:

1. Makes three linear passes through the array
  First pass: Calculate left products O(n)
  Second pass: Calculate right products O(n)
  Third pass: Combine results O(n)
  Total: O(3n) which simplifies to O(n)

2. Avoids Redundant Calculations: The brute force recalculates many of the same products repeatedly.    For example, with [1,2,3,4]:
  For index 0: Calculate 2*3*4
  For index 1: Calculate 1*3*4
  For index 2: Calculate 1*2*4
  For index 3: Calculate 1*2*3
  Many multiplications are repeated.

3. Precomputes Products: The current solution stores intermediate results:
Left products: [1,1,2,6]
Right products: [24,12,4,1]
Each multiplication is done exactly once and reused.
*/

//TC: O(n)
// SC: O(n)
const productExceptSelf2 = function (nums) {
  const result = new Array(nums.length).fill(1);
  // left[0] = 1 (There is nothing to the left of nums[0], so we set it to 1)
  const left = new Array(nums.length).fill(1);
  // right[len - 1] = 1 (There is nothing to the right of nums[len-1], so we set it to 1)
  const right = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    // Since left[i] is product of all "left" uptil ith index (in left, not nums, i.e. it includes nums[i - 1], not nums[i])
    // (Every index i in left contains product of nums[0] * .... * nums[i-1])
    // left[i] = nums[0] * .... * nums[i - 2] * nums[i - 1]
    // and left[i - 1] = nums[0] * .... * nums[i - 2]
    // Basically, left[i] = left[i - 1] * nums[i - 1]
    left[i] *= left[i - 1] * nums[i - 1];
  }
  for (let i = nums.length - 2; i >= 0; i--) {
    // Since right[i] is product of all right after ith index (in right, not nums, i.e. it includes nums[i + 1], not nums[i])
    // (Every index i in right contains product of nums[i+1] * .. nums[len - 1])
    // i.e: right[i] = nums[ i + 1] * nums[ i + 2] .... * nums[len(nums)]
    // and right[i + 1] = nums[i + 2]  * .... * nums[len(nums)]
    right[i] *= right[i + 1] * nums[i + 1];
  }
  console.log(left, right);
  for (let i = 0; i < nums.length; i++) {
    // Every index i in results contains product of all except i
    // results[i] = nums[0] * .... * nums[i-1] * nums[i + 1] * .... * nums[len]

    /*
      For i = 0:
      results[i] = nums[i + 1] * ...... * nums[nums.length - 1]

      For i = nums.length - 1:
      results[i] = nums[0] * ...... * nums[i-1]*/

    /*For any i-th item in nums we should be able to calculate the product of
      everything but itself, by multiplying its left and right product! */
    //left[i] contains product including nums[i - 1]
    //right[i] contains product starting nums[i + 1], including nums[len - 1]
    result[i] = left[i] * right[i];
  }
  return result;
};

/*
Add optimisation to the solution above.

Instead of using two arrays left[] and right[], we will keep track of product from left and product from right.
Hence, at each i, res[i] = productFromLeft * productFromRight. Since we can't have access to productFromLeft and productFromRight at the same time without storing them somewhere, we will set res[i] to productFromLeft when
iterating from the start and we will multiply productFromRight to each res[i] as we iterate through from the end.

Instead of using separate left[] and right[] arrays, we:

Use result[] array to store prefix products
Use a single postfix variable for suffix products
Space complexity reduced from O(n) to O(1)
*/

//TC: O(n)
//SC: O(n)
const productExceptSelf3 = function (nums) {
  const result = new Array(nums.length).fill(1);
  // Product of elements to the left
  let prefix = 1; // no values to the left of 1st index => default = 1
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix; // result[i] set to product of left of nums[i]
    prefix *= nums[i]; // calculates left product to curr (i + 1) index
  }
  // Product of elements to the right
  let postfix = 1; // no values to the right of last index => default = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    // result[i] contains product to left of nums[i]
    // (now being multiplied with product to right of nums[i])
    result[i] *= postfix;
    postfix *= nums[i]; // calculates right product to prev (i - 1) index
  }
  return result;
};

/*

Same as the above but a minor difference:

Above approach: Updates result first, then updates prefix
Below approach: Updates prefix first, then updates result
Above approach starts from index 0, below from index 1

*/

const productExceptSelf = function (nums) {
  let result = new Array(nums.length).fill(1);
  let prefix = 1; // no values to the left of 1st index => default = 1
  // Starting from the 1st index and calculating its left product first
  for (let i = 1; i < nums.length; i++) {
    prefix *= nums[i - 1]; // calculates left product to curr (ith) index
    result[i] = prefix; // result[i] set to "product to left of nums[i]"
  }
  let postfix = 1; // no values to the right of last index => default = 1
  for (let i = nums.length - 2; i >= 0; i--) {
    postfix *= nums[i + 1]; // calculates right product to curr (ith) index
    // result[i] contains product to left of nums[i]
    // (now being multiplied with product to right of nums[i])
    result[i] *= postfix;
  }
  return result;
};
