export function radixSort(array) {
  const animations = [];
  for (let j = 1; j >= 0; j--) {
    for (let i = 0; i < array.length; i++) {
      let temp = array[i] + '';
      let first = temp.charAt(j);
      for (let y = i; y >= 0; y--) {
        let temp2 = array[y] + '';
        let max = temp2.charAt(j);
        animations.push([i, y]);
        animations.push([i, y]);
        if (first < max) {
          let g = array[i];
          array[i] = array[y];
          array[y] = g;
        }
        animations.push([i, array[y]]);
      }
    }
  }
  console.log(array);
  return animations;
}

function radixSort(arr) {
  // Find the max number and multiply it by 10 to get a number
  // with no. of digits of max + 1
  const maxNum = Math.max(...arr) * 10;
  let divisor = 10;
  while (divisor < maxNum) {
    // Create bucket arrays for each of 0-9
    let buckets = [...Array(10)].map(() => []);
    // For each number, get the current significant digit and put it in the respective bucket
    for (let num of arr) {
      buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
    }
    // Reconstruct the array by concatinating all sub arrays
    arr = [].concat.apply([], buckets);
    // Move to the next significant digit
    divisor *= 10;
  }
  return arr;
}
