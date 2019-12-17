import {createAction, handleActions} from 'redux-actions';

export function handleDispatch(toDispatch, dispatch, array, speed) {
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
