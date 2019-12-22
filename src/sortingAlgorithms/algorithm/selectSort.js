export function selectSort(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    let min = array[i];
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        minIndex = j;
      }
    }
    if (i != minIndex) {
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
    animations.push([i, minIndex]);
    animations.push([i, minIndex]);
    animations.push([i, min]);
  }
  return animations;
}
