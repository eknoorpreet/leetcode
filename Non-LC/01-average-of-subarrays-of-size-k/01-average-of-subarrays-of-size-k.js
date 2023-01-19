/*Given an array, find the average of all contiguous subarrays of size ‘K’ in it.*/

const averageOfSubarrays = (arr, k) => {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    let subSum = 0;
    let subAvg = 0;
    //not j <= i + k; wll run k times
    for (let j = i; j < i + k; j++) {
      subSum += arr[j];
    }
    //subArr ended, calc avg and push into the array
    subAvg = subSum / k;
    result.push(subAvg);
  }
  return result;
};

averageOfSubarrays([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);

//TC: O(n * k): For every element, we are calculating its sum with the next k elements
//SC: O(k)

//Optimal Solution

const averageOfSubarraysOptimized = (arr, k) => {
  let result = [];
  let windowStart = 0;
  let windowSum = 0;
  //the window length = windowEnd - windowStart + 1
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    //if k = 5, sub array ends at windowEnd = 4 (k - 1) because we start from 0
    if (windowEnd >= k - 1) {
      result.push(windowSum / k);
      //subtract the element going out of the window (next element will be added in next iteration)
      windowSum -= arr[windowStart];
      //slide the window by 1 element
      windowStart++;
    }
  }
  console.log(result);
  return result;
};

//TC: O(n): We only traverse through each element once since we we reuse the sum from the previous subarray
//SC: O(k)

averageOfSubarraysOptimized([1, 3, 2, 6, -1, 4, 1, 8, 2], 5);
