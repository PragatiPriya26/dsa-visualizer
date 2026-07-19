import ComplexityCard from "./ComplexityCard";

function Sidebar({
  selectedAlgorithm,
  comparisons,
  swaps,
  elapsedTime,
  sortedCount,
  totalBars,
  progress,
}) {
  return (
    <div className="space-y-4">

      {/* Complexity */}
      <ComplexityCard algorithm={selectedAlgorithm} />

      {/* Statistics */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

        <h2 className="text-lg font-bold text-cyan-300 mb-3">
          Statistics
        </h2>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Comparisons</span>
            <span>{comparisons}</span>
          </div>

          <div className="flex justify-between">
            <span>Swaps</span>
            <span>{swaps}</span>
          </div>

          <div className="flex justify-between">
            <span>Time</span>
            <span>{elapsedTime} ms</span>
          </div>

          <div className="flex justify-between">
            <span>Sorted</span>
            <span>
              {sortedCount}/{totalBars}
            </span>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

        <div className="flex justify-between mb-2">
          <span className="text-cyan-300 font-semibold">
            Progress
          </span>

          <span>{progress}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Legend */}
      {/* Legend */}
<div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

  <h2 className="text-lg font-bold text-cyan-300 mb-3">
    Legend
  </h2>

  <div className="grid grid-cols-2 gap-3 text-sm">

    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-cyan-400"></div>
      <span>Unsorted</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-red-500"></div>
      <span>Comparing</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-purple-500"></div>
      <span>Minimum</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-orange-500"></div>
      <span>Swapping</span>
    </div>

    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded bg-green-500"></div>
      <span>Sorted</span>
    </div>

  </div>

</div>
      </div>

    
  );
}

export default Sidebar;