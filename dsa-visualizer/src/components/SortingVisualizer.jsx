import ArrayBars from "./ArrayBars";

function SortingVisualizer({
  array,
  activeBars,
  sortedBars,
})  {
  return (
    <div className="mt-10">
      <ArrayBars
  array={array}
  activeBars={activeBars}
  sortedBars={sortedBars}
/>
    </div>
  );
}

export default SortingVisualizer;