import ComplexityCard from "./ComplexityCard";
import StatCard from "./StatCard";
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

  <h2 className="text-xl font-bold text-cyan-300 mb-5">
    📊 Statistics
  </h2>

  <div className="grid grid-cols-1 gap-4">

    <StatCard
      icon="📊"
      title="Comparisons"
      value={comparisons}
      color="bg-cyan-500/20"
    />

    <StatCard
      icon="🔄"
      title="Swaps"
      value={swaps}
      color="bg-orange-500/20"
    />

    <StatCard
      icon="⏱"
      title="Execution Time"
      value={`${elapsedTime} ms`}
      color="bg-green-500/20"
    />

    <StatCard
      icon="✅"
      title="Sorted"
      value={`${sortedCount}/${totalBars}`}
      color="bg-purple-500/20"
    />

  </div>

</div>
      {/* Progress */}

<div className="bg-[#102235] border border-slate-700 rounded-2xl p-5 shadow-xl">

  <div className="flex justify-between items-center mb-3">

    <h2 className="text-cyan-300 font-bold">
      📈 Progress
    </h2>

    <span className="text-white font-semibold">
      {progress}%
    </span>

  </div>

  <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">

    <div
      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 transition-all duration-500"
      style={{ width: `${progress}%` }}
    />

  </div>

</div>

      {/* Legend */}
      {/* Legend */}
<div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

  <h2 className="text-lg font-bold text-cyan-300 mb-3">
    Legend
  </h2>

  <div className="grid grid-cols-2 gap-4 text-sm">

  <div className="flex items-center gap-3">
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse"></div>
    <span>Unsorted</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
    <span>Comparing</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse"></div>
    <span>Minimum</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse"></div>
    <span>Swapping</span>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
    <span>Sorted</span>
  </div>

</div>

</div>
      </div>

    
  );
}

export default Sidebar;