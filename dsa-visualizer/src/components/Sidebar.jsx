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
  const safeProgress = Math.min(100, Math.max(0, progress || 0));

  return (
    <div className="space-y-4">

      {/* ============================================
          COMPLEXITY
      ============================================ */}

      <ComplexityCard algorithm={selectedAlgorithm} />

      {/* ============================================
          STATISTICS
      ============================================ */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

        <h3 className="text-lg font-bold text-white mb-4">
          Statistics
        </h3>

        <div className="grid grid-cols-2 gap-3">

          {/* Comparisons */}
          <StatCard
            title="Comparisons"
            value={comparisons}
            color="cyan"
          />

          {/* Swaps / Writes */}
          <StatCard
            title={
              selectedAlgorithm === "merge"
                ? "Writes"
                : "Swaps"
            }
            value={swaps}
            color="orange"
          />

          {/* Time */}
          <StatCard
            title="Time"
            value={
              <span>
                {elapsedTime}
                <span className="text-sm ml-1 text-green-300">
                  ms
                </span>
              </span>
            }
            color="green"
          />

          {/* Sorted */}
          <StatCard
            title="Sorted"
            value={
              <span>
                {sortedCount}
                <span className="text-lg text-slate-500">
                  /{totalBars}
                </span>
              </span>
            }
            color="purple"
          />

        </div>
      </div>

      {/* ============================================
          COLOUR INDICATOR
      ============================================ */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

        <h3 className="text-lg font-bold text-white mb-4">
          Colour Indicator
        </h3>

        <div className="space-y-3">

          {/* Normal */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-5
                h-5
                rounded
                bg-gradient-to-t
                from-cyan-700
                to-cyan-300
                shadow-[0_0_8px_rgba(34,211,238,0.35)]
              "
            />

            <div>
              <p className="text-sm font-medium text-slate-200">
                Normal
              </p>
              <p className="text-xs text-slate-500">
                Unprocessed element
              </p>
            </div>

          </div>

          {/* Comparing */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-5
                h-5
                rounded
                bg-gradient-to-t
                from-red-700
                to-red-400
                shadow-[0_0_10px_rgba(239,68,68,0.55)]
              "
            />

            <div>
              <p className="text-sm font-medium text-slate-200">
                Comparing
              </p>
              <p className="text-xs text-slate-500">
                Elements currently being compared
              </p>
            </div>

          </div>

          {/* Swapping */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-5
                h-5
                rounded
                bg-gradient-to-t
                from-orange-700
                to-orange-400
                border
                border-orange-300
                shadow-[0_0_10px_rgba(251,146,60,0.65)]
              "
            />

            <div>
              <p className="text-sm font-medium text-slate-200">
                Swapping / Writing
              </p>
              <p className="text-xs text-slate-500">
                Elements currently being moved
              </p>
            </div>

          </div>

          {/* Minimum */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-5
                h-5
                rounded
                bg-gradient-to-t
                from-purple-700
                to-purple-400
                border
                border-purple-300
                shadow-[0_0_10px_rgba(168,85,247,0.55)]
              "
            />

            <div>
              <p className="text-sm font-medium text-slate-200">
                Minimum / Key
              </p>
              <p className="text-xs text-slate-500">
                Current minimum or insertion key
              </p>
            </div>

          </div>

          {/* Sorted */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-5
                h-5
                rounded
                bg-gradient-to-t
                from-green-700
                to-green-400
                shadow-[0_0_10px_rgba(34,197,94,0.55)]
              "
            />

            <div>
              <p className="text-sm font-medium text-slate-200">
                Sorted
              </p>
              <p className="text-xs text-slate-500">
                Element in its final position
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================
          PROGRESS
      ============================================ */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">

          <div>
            <p className="text-white font-semibold">
              Progress
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Sorting completion
            </p>
          </div>

          <span className="text-cyan-300 font-bold tabular-nums">
            {safeProgress}%
          </span>

        </div>

        {/* Progress Track */}
        <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">

          {/* Progress Fill */}
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-cyan-300
              transition-all
              duration-300
              ease-out
            "
            style={{
              width: `${safeProgress}%`,
            }}
          />

          {/* Shine */}
          {safeProgress > 0 && safeProgress < 100 && (
            <div
              className="
                absolute
                top-0
                h-full
                w-8
                bg-white/20
                blur-sm
                animate-pulse
              "
              style={{
                left: `calc(${safeProgress}% - 16px)`,
              }}
            />
          )}

        </div>

        {/* Progress Status */}
        <div className="flex justify-between items-center mt-2 text-xs">

          <span className="text-slate-500">
            {safeProgress === 0
              ? "Waiting to start"
              : safeProgress === 100
              ? "Complete"
              : "Sorting in progress..."}
          </span>

          <span className="text-slate-500">
            {sortedCount}/{totalBars} sorted
          </span>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;