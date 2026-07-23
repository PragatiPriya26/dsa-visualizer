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
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700">

          <div>
            <h2 className="text-2xl font-bold text-cyan-300">
              Sorting Visualizer
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              {selectedAlgorithm.charAt(0).toUpperCase() +
                selectedAlgorithm.slice(1)}{" "}
              Sort • Interactive Visualization
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* Status */}
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-green-300 text-sm font-medium">
                Ready
              </span>
            </div>

            {/* Number of bars */}
            <div className="bg-slate-800 px-4 py-2 rounded-xl">
              <span className="text-cyan-300 font-semibold">
                {array.length} Bars
              </span>
            </div>

          </div>

        </div>

        {/* Visualization */}
        <div className="relative p-8 min-h-[470px]">

          {/* Grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_top,#ffffff_1px,transparent_1px)] bg-[size:45px_45px]"></div>

          <ArrayBars
            array={array}
            activeBars={activeBars}
            swappingBars={swappingBars}
            sortedBars={sortedBars}
            minBar={minBar}
            selectedAlgorithm={selectedAlgorithm}
          />

        </div>

      </div>
    </div>
  );
}

export default SortingVisualizer;