export function quickSort(array, left, right) {
  const animations = [];
  var index;
  if (array.length > 1) {
    index = partition(array, left, right)[0];
    const rest = partition(array, left, right)[1];
    console.log(' first  ', [left, right, index]);
    animations.push([left, right, index]);
    if (left < index - 1) {
      console.log('secon ', [left, right, index]);
      animations.push([left, right, index]);
      quickSort(array, left, index - 1);
    }

    if (index < right) {
      console.log('third', [left, right, index]);
      animations.push([left, right, index]);
      quickSort(array, index, right);
    }
  }
  return animations;
}

function partition(items, left, right) {
  const result = [];
  const animations = [];
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;

  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      console.log('fourth ', [i, j, items[j]]);
      animations.push([i, j, items[j]]);
      i++;
      j--;
    }
  }
  result.push(i);
  result.push(animations);
  return result;
}
function swap(items, firstIndex, secondIndex) {
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}
