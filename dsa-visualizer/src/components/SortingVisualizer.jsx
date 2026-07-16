import { useEffect } from "react";
import ArrayBars from "./ArrayBars";

function SortingVisualizer({ array, generateArray }) {
  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="mt-10">
      <ArrayBars array={array} />
    </div>
  );
}

export default SortingVisualizer;