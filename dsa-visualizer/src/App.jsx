import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AlgorithmTabs from "./components/AlgorithmTabs";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import Sidebar from "./components/Sidebar";
import TracePanel from "./components/TracePanel";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";

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

  function generateArray() {
    let newArray = [];

    // Random Array
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        id: crypto.randomUUID(),
        value: Math.floor(Math.random() * 300) + 20,
      });
    }

    // Nearly Sorted
    if (arrayType === "nearly") {
      newArray.sort((a, b) => a.value - b.value);

      for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * arraySize);
        const b = Math.floor(Math.random() * arraySize);

        [newArray[a], newArray[b]] = [newArray[b], newArray[a]];
      }
    }

    // Reversed
    if (arrayType === "reversed") {
      newArray.sort((a, b) => b.value - a.value);
    }

    // Few Unique
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
  }

  useEffect(() => {
    generateArray();
  }, [arraySize, arrayType]);

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

            bubbleSort={() => {
              setSelectedAlgorithm("bubble");

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
                setProgress
              );
            }}

            selectionSort={() => {
              setSelectedAlgorithm("selection");

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
                setProgress
              );
            }}

            arraySize={arraySize}
            setArraySize={setArraySize}

            speed={speed}
            setSpeed={setSpeed}

            arrayType={arrayType}
            setArrayType={setArrayType}

            isSorting={isSorting}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

          {/* Left Side */}
          <div className="lg:col-span-2">

            <SortingVisualizer
              array={array}
              activeBars={activeBars}
              swappingBars={swappingBars}
              sortedBars={sortedBars}
              minBar={minBar}
            />

            <div className="mt-3">
              <TracePanel
                algorithm={selectedAlgorithm}
                currentLine={currentLine}
              />
            </div>

          </div>

          {/* Right Side */}
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