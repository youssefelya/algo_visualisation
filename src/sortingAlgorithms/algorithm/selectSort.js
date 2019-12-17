export function selectSort(array) {
  let min = 999999;
  let minIndex = 0;
  for (let i = 0; i < array.length; i++) {
    min = 999999;
    for (let j = i; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        minIndex = j;
      }
    }
    array[minIndex] = array[i];
    array[i] = min;
  }
  return array;
}
