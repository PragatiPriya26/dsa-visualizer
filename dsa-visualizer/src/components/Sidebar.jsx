import ComplexityCard from "./ComplexityCard";

function Sidebar({ selectedAlgorithm }) {
  return (
    <div className="space-y-6">

      <ComplexityCard algorithm={selectedAlgorithm} />

      {/* Statistics */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">
          Statistics
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Comparisons</span>
            <span>0</span>
          </div>

          <div className="flex justify-between">
            <span>Swaps</span>
            <span>0</span>
          </div>

          <div className="flex justify-between">
            <span>Elapsed Time</span>
            <span>0 ms</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl p-6 shadow-xl">

        <h2 className="text-xl font-bold text-cyan-300 mb-4">
          Legend
        </h2>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-cyan-400"></div>
            <span>Unsorted</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span>Comparing</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span>Swapping</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span>Sorted</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;