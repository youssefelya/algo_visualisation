import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {heapSort} from '../sortingAlgorithms/heapSort.js';
import './SortingVisualizer.css';
import {selectSort} from '../sortingAlgorithms/algorithm/selectSort';
import {quickSort} from '../sortingAlgorithms/algorithm/quickSort';
import {radixSort} from '../sortingAlgorithms/algorithm/radixSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 300;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'gray';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(3, 87));
    }
    this.setState({array});
  }

  animationFunction(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          // @ts-ignore
          arrayBars[barOneIdx].innerText = newHeight;
          barOneStyle.height = `${newHeight * 4}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.animationFunction(animations);
  }
  selectSort() {
    const animations = selectSort(this.state.array);
    this.animationFunction(animations);
  }
  quickSort() {
    console.log('array --> ', this.state.array);
    const animation = quickSort(this.state.array, 0, this.state.array.length);
    console.log(animation);
  }

  heapSort() {
    let arraySorted = this.state.array.slice().sort((a, b) => a - b);
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }
  radixSort() {
    const animations = radixSort(this.state.array);
    console.log(animations);
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 10; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      //   console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;
    return (
      <div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value * 4}px`,
              }}>
              {value}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.radixSort()}>Radix Sort</button>
          <button onClick={() => this.selectSort()}>selection Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          {/* <button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button> */}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
