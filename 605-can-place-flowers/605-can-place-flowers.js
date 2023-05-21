/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */

//TC: O(n)
//SC: O(n)
// const canPlaceFlowers = function (flowerbed, n) {
//   //3 consequtive empty spots => can place
//   //edge case: what if the flowerbed does not start with 1: [0, 0, 1] => can place in first
//   //despite only 2 conse empty spots (because we can say the first and last can have a left and right empty spot)
//   const flowerbedCopy = [0, ...flowerbed, 0];
//   //-1th and n.length spot are fictional => don't include them
//   for (let i = 1; i < flowerbedCopy.length - 1; i++) {
//     if (
//       flowerbedCopy[i - 1] === 0 &&
//       flowerbedCopy[i] === 0 &&
//       flowerbedCopy[i + 1] === 0
//     ) {
//       flowerbedCopy[i] = 1;
//       n--;
//     }
//   }
//   if (n <= 0) return true;
//   return false;
// };

const canPlaceFlowers = function (flowerbed, n) {
  //optimization
  if (n === 0) return true;
  for (let i = 0; i < flowerbed.length; i++) {
    //3 consequtive empty spots => can place
    //edge case: what if the flowerbed does not start with 1: [0, 0, 1] => can place in first
    //despite only 2 consequtive empty spots
    //check: if current spot is empty AND (either previous spot is empty OR the current is first spot)
    //AND (either next spot is empty OR the current is is last spot)
    //(since for the first spot, we should not have to check the prev one and for the last spot, we should not to check the next one)
    if (
      flowerbed[i] === 0 &&
      (i === 0 || flowerbed[i - 1] === 0) &&
      (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)
    ) {
      flowerbed[i] = 1;
      n--;
    }
    //optimization
    if (n === 0) return true;
  }
  return n <= 0;
};

//TC: O(n)
//SC: O(1)
