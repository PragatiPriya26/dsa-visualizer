import ArrayBars from "./ArrayBars";

function SortingVisualizer({
  array,
  activeBars,
  swappingBars,
  sortedBars,
  minBar,
  selectedAlgorithm,
}) {
  return (
    <div className="mt-4">

      <div className="bg-[#102235] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-slate-700">

          <div>
            <h2 className="text-cyan-300 font-bold text-lg">
              Sorting Visualizer
            </h2>

            <p className="text-slate-400 text-sm">
              Live Animation
            </p>
          </div>

          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

        </div>

        {/* Visualization */}
        <div className="relative p-6">

          {/* Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_top,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <ArrayBars
  array={array}
  activeBars={activeBars}
  swappingBars={swappingBars}
  sortedBars={sortedBars}
  minBar={minBar}
/>
        </div>

      </div>

    </div>
  );
}

export default SortingVisualizer;