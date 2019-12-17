import {handleDispatch} from './index';
export function heapSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
    toDispatch = [];
  buildMaxHeap(array, toDispatch);
  let end = array.length - 1;
  while (end > 0) {
    toDispatch.push([0, end]);
    let temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    toDispatch.push([0, end, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    toDispatch.push([true, end]);
    siftDown(array, 0, end, toDispatch);
    end--;
  }
  toDispatch.push([true, end]);
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

function buildMaxHeap(array, toDispatch) {
  let currentIndex = Math.floor(array.length / 2);
  while (currentIndex >= 0) {
    siftDown(array, currentIndex, array.length, toDispatch);
    currentIndex--;
  }
}

function siftDown(array, start, end, toDispatch) {
  if (start >= Math.floor(end / 2)) {
    return;
  }
  let left = start * 2 + 1,
    right = start * 2 + 2 < end ? start * 2 + 2 : null,
    swap;
  if (right) {
    toDispatch.push([start, left, right]);
    swap = array[left] > array[right] ? left : right;
  } else {
    toDispatch.push([start, left]);
    swap = left;
  }
  if (array[start] < array[swap]) {
    let temp = array[swap];
    array[swap] = array[start];
    array[start] = temp;
    toDispatch.push([start, swap, true]);
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    siftDown(array, swap, end, toDispatch);
  }
}
