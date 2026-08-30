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

  // ==================================================
  // COLOUR INDICATOR DATA
  // ==================================================

  let indicators = [];

  // --------------------------------------------------
  // BUBBLE SORT
  // --------------------------------------------------

  if (selectedAlgorithm === "bubble") {
    indicators = [
      {
        color:
          "bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.35)]",
        title: "Normal",
        description: "Unprocessed element",
      },
      {
        color:
          "bg-gradient-to-t from-red-700 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.55)]",
        title: "Comparing",
        description: "Elements currently being compared",
      },
      {
        color:
          "bg-gradient-to-t from-orange-700 to-orange-400 border border-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.65)]",
        title: "Swapping",
        description: "Elements currently being swapped",
      },
      {
        color:
          "bg-gradient-to-t from-green-700 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]",
        title: "Sorted",
        description: "Element in its final position",
      },
    ];
  }

  // --------------------------------------------------
  // SELECTION SORT
  // --------------------------------------------------

  else if (selectedAlgorithm === "selection") {
    indicators = [
      {
        color:
          "bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.35)]",
        title: "Normal",
        description: "Unprocessed element",
      },
      {
        color:
          "bg-gradient-to-t from-violet-950 via-violet-700 to-violet-400 border-2 border-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.9)]",
        title: "Minimum",
        description: "Current minimum element",
      },
      {
        color:
          "bg-gradient-to-t from-red-700 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.55)]",
        title: "Comparing",
        description: "Element being compared with minimum",
      },
      {
        color:
          "bg-gradient-to-t from-orange-700 to-orange-400 border border-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.65)]",
        title: "Swapping",
        description: "Elements currently being swapped",
      },
      {
        color:
          "bg-gradient-to-t from-green-700 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]",
        title: "Sorted",
        description: "Element in its final position",
      },
    ];
  }

  // --------------------------------------------------
  // INSERTION SORT
  // --------------------------------------------------

  else if (selectedAlgorithm === "insertion") {
    indicators = [
      {
        color:
          "bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.35)]",
        title: "Normal",
        description: "Unprocessed element",
      },
      {
        color:
          "bg-gradient-to-t from-violet-950 via-violet-700 to-violet-400 border-2 border-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.9)]",
        title: "Key",
        description: "Current element being inserted",
      },
      {
        color:
          "bg-gradient-to-t from-red-700 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.55)]",
        title: "Comparing",
        description: "Elements currently being compared",
      },
      {
        color:
          "bg-gradient-to-t from-orange-700 to-orange-400 border border-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.65)]",
        title: "Moving",
        description: "Element being moved to make space",
      },
      {
        color:
          "bg-gradient-to-t from-green-700 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]",
        title: "Sorted",
        description: "Element in sorted portion",
      },
    ];
  }

  // --------------------------------------------------
  // MERGE SORT
  // --------------------------------------------------

  else if (selectedAlgorithm === "merge") {
    indicators = [
      {
        color:
          "bg-gradient-to-t from-cyan-700 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.35)]",
        title: "Normal",
        description: "Unprocessed element",
      },
      {
        color:
          "bg-gradient-to-t from-violet-950 via-violet-700 to-violet-400 border-2 border-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.9)]",
        title: "Merge Range",
        description: "Section currently being processed",
      },
      {
        color:
          "bg-gradient-to-t from-red-700 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.55)]",
        title: "Comparing",
        description: "Elements currently being compared",
      },
      {
        color:
          "bg-gradient-to-t from-orange-700 to-orange-400 border border-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.65)]",
        title: "Writing",
        description: "Element being placed into the array",
      },
      {
        color:
          "bg-gradient-to-t from-green-700 to-green-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]",
        title: "Sorted",
        description: "Entire array has been sorted",
      },
    ];
  }

  return (
    <div className="space-y-4">

      {/* ==================================================
          COMPLEXITY
      ================================================== */}

      <ComplexityCard algorithm={selectedAlgorithm} />

      {/* ==================================================
          STATISTICS
      ================================================== */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

        <h3 className="text-lg font-bold text-white mb-4">
          Statistics
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <StatCard
            title="Comparisons"
            value={comparisons}
            color="cyan"
          />

          <StatCard
            title={
              selectedAlgorithm === "merge"
                ? "Writes"
                : "Swaps"
            }
            value={swaps}
            color="orange"
          />

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

      {/* ==================================================
          COLOUR INDICATOR
      ================================================== */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

        <h3 className="text-lg font-bold text-white mb-4">
          Colour Indicator
        </h3>

        <div className="space-y-3">

          {indicators.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >

              <div
                className={`
                  w-5
                  h-5
                  rounded
                  flex-shrink-0
                  ${item.color}
                `}
              />

              <div>
                <p className="text-sm font-medium text-slate-200">
                  {item.title}
                </p>

                <p className="text-xs text-slate-500">
                  {item.description}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* ==================================================
          PROGRESS
      ================================================== */}

      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">

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

        <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">

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