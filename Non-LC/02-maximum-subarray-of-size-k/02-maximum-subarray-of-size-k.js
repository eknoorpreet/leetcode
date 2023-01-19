//Given an array of positive numbers and a positive number ‘k’, find the maximum sum of any contiguous subarray of size ‘k’.

const maxSubSum = (arr, k) => {
  let maxSum = 0;
  for (let i = 0; i <= arr.length - k; i++) {
    let subSum = 0;
    for (let j = i; j < i + k; j++) {
      subSum += arr[j];
    }
    maxSum = Math.max(subSum, maxSum);
  }
  console.log(maxSum);
  return maxSum;
};

// maxSubSum([2, 1, 5, 1, 3, 2], 3);
// maxSubSum([2, 3, 4, 1, 5], 2);

//TC: O(n * k), SC: O(1)

const maxSubSumOpt = (arr, k) => {
  let maxSum = 0;
  let start = 0;
  let sum = 0;
  for (let end = 0; end < arr.length; end++) {
    sum += arr[end];
    if (end >= k - 1) {
      maxSum = Math.max(maxSum, sum);
      sum -= arr[start];
      start++;
    }
  }
  console.log(maxSum);
  return maxSum;
};

//TC: O(n), SC: O(1)

maxSubSumOpt([2, 1, 5, 1, 3, 2], 3);
maxSubSumOpt([2, 3, 4, 1, 5], 2);
