/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */

const makesquare = function (matchsticks) {
  let sum = 0;
  //initialize sides as an arr = [0, 0, 0, 0] (currently empty; we need to build them up)
  const sides = new Array(4).fill(0);
  for (let n of matchsticks) {
    sum += n;
  }
  //length of each side = total sum / 4
  const length = sum / 4;
  if (sum % 4 !== 0) return false; //9/4 = 2.25 => false (since matchstick lengths will just be integers)

  //optimization: sort in desc order
  //if length = 2 and longest/first stick = 3 => impossible to build square => false
  matchsticks.sort((a, b) => b - a);

  const backtrack = (i) => {
    if (i === matchsticks.length) return true;
    //for each matchstick, we have 4 choices (sides)
    for (let j = 0; j < 4; j++) {
      //as long as the curr side (made of prev sticks) + curr matchstick <= length of side
      if (sides[j] + matchsticks[i] <= length) {
        sides[j] += matchsticks[i]; //add it and explore further options
        if (backtrack(i + 1)) return true;
        sides[j] -= matchsticks[i]; //undo/backtrack
      }
    }
    return false;
  };
  return backtrack(0);
};

//TC: height of tree = n (size of input arr). At each leevl, we're making 4 choices => 4^n
