import ArrayBars from "./ArrayBars";

function SortingVisualizer({
  array,
  activeBars,
  swappingBars,
  sortedBars,
}) {
  return (
    <div className="mt-10">

      {/* Visualization Card */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Card Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700">

          <h2 className="text-cyan-300 uppercase tracking-[4px] text-sm font-semibold">
            Bubble Sort Visualization
          </h2>

          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

        </div>

        {/* Bars */}
        <div className="p-6">
          <ArrayBars
  array={array}
  activeBars={activeBars}
  swappingBars={swappingBars}
  sortedBars={sortedBars}
/>
        </div>

      </div>

    </div>
  );
}

export default SortingVisualizer;