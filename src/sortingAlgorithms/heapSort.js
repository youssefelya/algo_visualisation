import {createAction, handleActions} from 'redux-actions';
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

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentHeapThree(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentHeapThree([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction =
    toDispatch[0].length > 3
      ? setArray
      : (toDispatch[0].length === 3 && typeof toDispatch[0][2] === 'boolean') ||
        !toDispatch[0].length
      ? setCurrentSwappers
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean'
      ? setCurrentSorted
      : setCurrentHeapThree;
  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}
const initialState1 = [];
const SET_ARRAY = 'SET_ARRAY';
const setArray = createAction(SET_ARRAY);

const array = handleActions(
  {
    SET_ARRAY: (state, {payload}) => {
      return payload;
    },
  },
  initialState1,
);

const SET_CURRENT_HEAPTHREE = 'SET_CURRENT_HEAPTHREE';
const setCurrentHeapThree = createAction(SET_CURRENT_HEAPTHREE);

const currentHeapThree = handleActions(
  {
    SET_CURRENT_HEAPTHREE: (state, {payload}) => {
      return payload;
    },
  },
  initialState1,
);

const SET_CURRENT_SWAPPERS = 'SET_CURRENT_SWAPPERS';
const setCurrentSwappers = createAction(SET_CURRENT_SWAPPERS);

const currentSwappers = handleActions(
  {
    SET_CURRENT_SWAPPERS: (state, {payload}) => {
      if (payload.length) {
        return state.concat(payload);
      } else {
        return [];
      }
    },
  },
  initialState1,
);

const SET_RUNNING = 'SET_RUNNING';
const setRunning = createAction(SET_RUNNING);

const isRunning = handleActions(
  {
    SET_RUNNING: (state, {payload}) => {
      return payload;
    },
  },
  initialState1,
);

const SET_CURRENT_SORTED = 'SET_CURRENT_SORTED';
const setCurrentSorted = createAction(SET_CURRENT_SORTED);

const currentSorted = handleActions(
  {
    SET_CURRENT_SORTED: (state, {payload}) => {
      if (payload.length) {
        return state.concat(payload);
      } else {
        return [];
      }
    },
  },
  initialState1,
);
