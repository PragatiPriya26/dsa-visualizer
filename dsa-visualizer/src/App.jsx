import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AlgorithmTabs from "./components/AlgorithmTabs";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import Sidebar from "./components/Sidebar";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";


function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(80);

  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [swappingBars, setSwappingBars] = useState([]);
  const [comparisons, setComparisons] = useState(0);
const [swaps, setSwaps] = useState(0);
const [elapsedTime, setElapsedTime] = useState(0);
  

 function generateArray() {
  const newArray = [];

  for (let i = 0; i < arraySize; i++) {
    newArray.push({
      id: crypto.randomUUID(),
      value: Math.floor(Math.random() * 300) + 20,
    });
  }

  setArray(newArray);
  setActiveBars([]);
  setSwappingBars([]);
  setSortedBars([]);
}

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="grid-bg min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Algorithm Tabs */}
        <AlgorithmTabs
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />

        {/* Controls */}
        <div className="mt-6">
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
  setElapsedTime
);
            }}
            selectionSort={() => {
              setSelectedAlgorithm("selection");

              selectionSort(
                array,
                setArray,
                speed,
                setActiveBars,
                setSortedBars,
                setIsSorting
              );
            }}
            arraySize={arraySize}
            setArraySize={setArraySize}
            speed={speed}
            setSpeed={setSpeed}
            isSorting={isSorting}
          />
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* Visualization */}
          <div className="lg:col-span-2">
            <SortingVisualizer
  array={array}
  activeBars={activeBars}
  swappingBars={swappingBars}
  sortedBars={sortedBars}
/>
          </div>

          {/* Right Sidebar */}
          <Sidebar
  selectedAlgorithm={selectedAlgorithm}
  comparisons={comparisons}
  swaps={swaps}
  elapsedTime={elapsedTime}
/>

        </div>

      </div>
    </div>
  );
}

export default App;