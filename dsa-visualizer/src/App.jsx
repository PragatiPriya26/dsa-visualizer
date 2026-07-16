import { useState } from "react";
import Navbar from "./components/Navbar";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import { bubbleSort } from "./algorithms/bubbleSort";

function App() {
  const [array, setArray] = useState([]);

  function generateArray() {
    const newArray = [];

    for (let i = 0; i < 30; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 20);
    }

    setArray(newArray);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="px-6">
        <Controls
  generateArray={generateArray}
  bubbleSort={() => bubbleSort(array, setArray)}
/>
        <SortingVisualizer
          array={array}
          generateArray={generateArray}
        />
      </div>
    </div>
  );
}

export default App;