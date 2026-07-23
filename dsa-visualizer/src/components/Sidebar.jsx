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
<div className="bg-[#102235] border border-slate-700 rounded-2xl p-5 shadow-xl">

  <h2 className="text-xl font-bold text-cyan-300 mb-4">
    Statistics
  </h2>

  <div className="grid grid-cols-2 gap-3">

    <div className="bg-slate-800 rounded-xl p-4 text-center">
      <p className="text-slate-400 text-sm">Comparisons</p>
      <p className="text-3xl font-bold text-cyan-300 mt-2">
        {comparisons}
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-4 text-center">
      <p className="text-slate-400 text-sm">Swaps</p>
      <p className="text-3xl font-bold text-orange-400 mt-2">
        {swaps}
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-4 text-center">
      <p className="text-slate-400 text-sm">Time</p>
      <p className="text-3xl font-bold text-green-400 mt-2">
        {elapsedTime} ms
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-4 text-center">
      <p className="text-slate-400 text-sm">Sorted</p>
      <p className="text-3xl font-bold text-purple-400 mt-2">
        {sortedCount}/{totalBars}
      </p>
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