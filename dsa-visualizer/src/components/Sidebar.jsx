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
  const isMergeSort = selectedAlgorithm === "merge";

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

          {/* Comparisons */}
          <div className="bg-slate-800 rounded-xl p-4 text-center transition-all duration-300 hover:bg-slate-700">
            <p className="text-slate-400 text-sm">
              Comparisons
            </p>

            <p className="text-3xl font-bold text-cyan-300 mt-2 tabular-nums">
              {comparisons}
            </p>
          </div>

          {/* Swaps / Writes */}
          <div className="bg-slate-800 rounded-xl p-4 text-center transition-all duration-300 hover:bg-slate-700">
            <p className="text-slate-400 text-sm">
              {isMergeSort ? "Writes" : "Swaps"}
            </p>

            <p className="text-3xl font-bold text-orange-400 mt-2 tabular-nums">
              {swaps}
            </p>
          </div>

          {/* Time */}
          <div className="bg-slate-800 rounded-xl p-4 text-center transition-all duration-300 hover:bg-slate-700">
            <p className="text-slate-400 text-sm">
              Time
            </p>

            <p className="text-3xl font-bold text-green-400 mt-2 tabular-nums">
              {elapsedTime}
              <span className="text-sm ml-1 text-green-300">
                ms
              </span>
            </p>
          </div>

          {/* Sorted / Processed */}
          <div className="bg-slate-800 rounded-xl p-4 text-center transition-all duration-300 hover:bg-slate-700">
            <p className="text-slate-400 text-sm">
              {isMergeSort ? "Processed" : "Sorted"}
            </p>

            <p className="text-3xl font-bold text-purple-400 mt-2 tabular-nums">
              {sortedCount}
              <span className="text-lg text-slate-500">
                /{totalBars}
              </span>
            </p>
          </div>

        </div>

      </div>

      {/* Progress */}
      <div className="bg-[#102235] border border-slate-700 rounded-2xl p-5 shadow-xl">

        <div className="flex justify-between items-center mb-3">

          <div>
            <p className="text-cyan-300 font-semibold">
              Progress
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Sorting completion
            </p>
          </div>

          <span className="text-cyan-300 font-bold tabular-nums">
            {progress}%
          </span>

        </div>

        {/* Progress Track */}
        <div className="relative w-full h-3 rounded-full bg-slate-700 overflow-hidden">

          {/* Progress Fill */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, progress)
              )}%`,
            }}
          />

          {/* Shine */}
          {progress > 0 && progress < 100 && (
            <div
              className="absolute top-0 h-full w-8 bg-white/20 blur-sm animate-pulse"
              style={{
                left: `calc(${progress}% - 16px)`,
              }}
            />
          )}

        </div>

        {/* Progress Status */}
        <div className="flex justify-between mt-2 text-xs">

          <span className="text-slate-500">
            {progress === 0
              ? "Waiting to start"
              : progress === 100
              ? "Complete"
              : "Sorting in progress..."}
          </span>

          <span className="text-slate-500">
            {sortedCount}/{totalBars}{" "}
            {isMergeSort ? "processed" : "sorted"}
          </span>

        </div>

      </div>

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