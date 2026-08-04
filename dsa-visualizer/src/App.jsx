import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import AlgorithmTabs from "./components/AlgorithmTabs";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import Sidebar from "./components/Sidebar";
import TracePanel from "./components/TracePanel";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(80);
  const [arrayType, setArrayType] = useState("random");

  const [activeBars, setActiveBars] = useState([]);
  const [swappingBars, setSwappingBars] = useState([]);
  const [minBar, setMinBar] = useState(-1);
  const [sortedBars, setSortedBars] = useState([]);

  const [isSorting, setIsSorting] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
const [stopSorting, setStopSorting] = useState(false);
const isPausedRef = useRef(false);
const stopSortingRef = useRef(false);
const [sortingFinished, setSortingFinished] = useState(false);
const [swapAnimation, setSwapAnimation] = useState({
  leftId: null,
  rightId: null,
});

  function generateArray() {
    let newArray = [];

    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        id: crypto.randomUUID(),
        value: Math.floor(Math.random() * 300) + 20,
      });
    }

    if (arrayType === "nearly") {
      newArray.sort((a, b) => a.value - b.value);

      for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * arraySize);
        const b = Math.floor(Math.random() * arraySize);

        [newArray[a], newArray[b]] = [newArray[b], newArray[a]];
      }
    }

    if (arrayType === "reversed") {
      newArray.sort((a, b) => b.value - a.value);
    }

    if (arrayType === "few") {
      newArray = [];

      for (let i = 0; i < arraySize; i++) {
        newArray.push({
          id: crypto.randomUUID(),
          value: [40, 80, 120, 160, 200][
            Math.floor(Math.random() * 5)
          ],
        });
      }
    }

    setArray(newArray);

    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setMinBar(-1);

    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setCurrentLine(0);
    setProgress(0);
    setSortingFinished(false);
    setStopSorting(false);
setIsPaused(false);

stopSortingRef.current = false;
isPausedRef.current = false;
  }

  useEffect(() => {
    generateArray();
  }, [arraySize, arrayType]);

  const startSorting = () => {
  setStopSorting(false);
setIsPaused(false);
setSortingFinished(false);

stopSortingRef.current = false;
isPausedRef.current = false;

  switch (selectedAlgorithm) {
    case "bubble":
     bubbleSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSwappingBars,
  setSortedBars,
  setIsSorting,
  setComparisons,
  setSwaps,
  setElapsedTime,
  setCurrentLine,
  setProgress,
  () => isPausedRef.current,
  () => stopSortingRef.current,
  setSortingFinished,
  setSwapAnimation
);
      break;

    case "selection":
      selectionSort(
        array,
        setArray,
        speed,
        setActiveBars,
        setSwappingBars,
        setMinBar,
        setSortedBars,
        setIsSorting,
        setComparisons,
        setSwaps,
        setElapsedTime,
        setCurrentLine,
        setProgress,
        () => isPausedRef.current,
() => stopSortingRef.current,
setSortingFinished
      );
      break;

    case "insertion":
      insertionSort(
        array,
        setArray,
        speed,
        setActiveBars,
        setSwappingBars,
        setMinBar,
        setSortedBars,
        setIsSorting,
        setComparisons,
        setSwaps,
        setElapsedTime,
        setCurrentLine,
        setProgress,
        () => isPausedRef.current,
() => stopSortingRef.current,
setSortingFinished
      );
      break;

  
case "merge":
  mergeSort(
    array,
    setArray,
    speed,
    setActiveBars,
    setSwappingBars,
    setSortedBars,
    setIsSorting,
    setComparisons,
    setSwaps,
    setElapsedTime,
    setCurrentLine,
    setProgress,
    () => isPausedRef.current,
    () => stopSortingRef.current,
    setSortingFinished
  );
  break;
  default:
      break;
  }
};  
const togglePause = () => {
  const next = !isPaused;

  setIsPaused(next);
  isPausedRef.current = next;
};

const resetSorting = async () => {
  // Tell algorithms to stop
  stopSortingRef.current = true;
  setStopSorting(true);

  // Wait one tick so the algorithm exits
  await new Promise((resolve) => setTimeout(resolve, 50));

  generateArray();
};
  return (
    <div className="grid-bg min-h-screen">
      <Navbar />

      <div className="max-w-[1700px] mx-auto px-5 py-3">

        <AlgorithmTabs
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />

        <div className="mt-3">
          <Controls
  generateArray={generateArray}
  startSorting={startSorting}

  selectedAlgorithm={selectedAlgorithm}
  setSelectedAlgorithm={setSelectedAlgorithm}

  arraySize={arraySize}
  setArraySize={setArraySize}

  speed={speed}
  setSpeed={setSpeed}

  arrayType={arrayType}
  setArrayType={setArrayType}

  isSorting={isSorting}

 isPaused={isPaused}
togglePause={togglePause}
resetSorting={resetSorting}
/> </div>

{sortingFinished && (
  <div className="mt-4 rounded-2xl border border-emerald-500 bg-emerald-500/10 p-5 text-center shadow-lg animate-pulse">
    <h2 className="text-2xl font-bold text-emerald-400">
      🎉 Sorting Completed!
    </h2>

    <p className="mt-2 text-slate-300">
      {selectedAlgorithm.charAt(0).toUpperCase() +
        selectedAlgorithm.slice(1)}{" "}
      Sort finished successfully.
    </p>
  </div>
)}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

          <div className="lg:col-span-2">

            <SortingVisualizer
              array={array}
              activeBars={activeBars}
              swappingBars={swappingBars}
              sortedBars={sortedBars}
              minBar={minBar}
              selectedAlgorithm={selectedAlgorithm}
            />

            <div className="mt-3">
              <TracePanel
                algorithm={selectedAlgorithm}
                currentLine={currentLine}
              />
            </div>

          </div>

          <Sidebar
            selectedAlgorithm={selectedAlgorithm}
            comparisons={comparisons}
            swaps={swaps}
            elapsedTime={elapsedTime}
            sortedCount={sortedBars.length}
            totalBars={array.length}
            progress={progress}
          />

        </div>

      </div>
    </div>
  );
}

export default App;