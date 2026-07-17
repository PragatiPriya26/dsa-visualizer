import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import { bubbleSort } from "./algorithms/bubbleSort";

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(80);
const [activeBars, setActiveBars] = useState([]);
const [sortedBars, setSortedBars] = useState([]);
  function generateArray() {
    const newArray = [];

    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(newArray);
  }

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="px-6">
        <Controls
          generateArray={generateArray}
          
  bubbleSort={() =>
  bubbleSort(
    array,
    setArray,
    speed,
    setActiveBars,
    setSortedBars
  )
}

          arraySize={arraySize}
          setArraySize={setArraySize}
          speed={speed}
          setSpeed={setSpeed}
        />

       <SortingVisualizer
  array={array}
  activeBars={activeBars}
  sortedBars={sortedBars}
/>
      </div>
    </div>
  );
}

export default App;