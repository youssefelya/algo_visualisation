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

  return animations;
}

