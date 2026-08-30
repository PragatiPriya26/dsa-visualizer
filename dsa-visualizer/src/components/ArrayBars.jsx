import { motion } from "framer-motion";

function ArrayBars({
  array,
  activeBars = [],
  swappingBars = [],
  sortedBars = [],
  minBar = -1,
  selectedAlgorithm,
  swapAnimation,
  mergeRange,
}) {
  const barWidth = Math.max(
    6,
    Math.min(24, 520 / Math.max(array.length, 1))
  );

  return (
    <div className="flex items-end justify-center gap-[2px] h-[380px]">
      {array.map((bar, index) => {
        // ==================================================
        // STATES
        // ==================================================

        const isSorted = sortedBars.includes(index);

        const isComparing = activeBars.includes(index);

        const isMoving = swappingBars.includes(index);

        const isMinimum = minBar === index;

        const isMergeRange =
          selectedAlgorithm === "merge" &&
          mergeRange !== null &&
          mergeRange !== undefined &&
          index >= mergeRange.left &&
          index <= mergeRange.right;

        // ==================================================
        // DEFAULT = CYAN
        // ==================================================

        let barClass =
          "bg-gradient-to-t from-cyan-700 to-cyan-300";

        let barShadow = "";
        let barBorder = "";

        // ==================================================
        // 🟢 SORTED
        // ==================================================

        if (
          isSorted &&
          !isComparing &&
          !isMoving &&
          !isMinimum &&
          !isMergeRange
        ) {
          barClass =
            "bg-gradient-to-t from-green-900 via-green-600 to-green-400";

          barShadow =
            "shadow-[0_0_20px_rgba(34,197,94,0.85)]";

          barBorder =
            "border-2 border-green-200";
        }

        // ==================================================
        // 🟣 MERGE RANGE
        //
        // Purple is applied before comparison/writing.
        // Therefore the entire current merge section
        // remains visible in purple.
        // ==================================================

        if (
          selectedAlgorithm === "merge" &&
          isMergeRange
        ) {
          barClass =
            "bg-gradient-to-t from-violet-950 via-violet-700 to-violet-400";

          barShadow =
            "shadow-[0_0_30px_rgba(139,92,246,0.95)]";

          barBorder =
            "border-2 border-violet-300";
        }

        // ==================================================
        // 🔴 COMPARING
        //
        // Only the bars actually being compared become red.
        // Other bars in mergeRange stay purple.
        // ==================================================

        if (
          isComparing &&
          !isMoving
        ) {
          barClass =
            "bg-gradient-to-t from-red-900 via-red-700 to-red-400";

          barShadow =
            "shadow-[0_0_28px_rgba(239,68,68,0.95)]";

          barBorder =
            "border-2 border-red-200";
        }

        // ==================================================
        // 🟠 MOVING / WRITING
        // ==================================================

        if (isMoving) {
          barClass =
            "bg-gradient-to-t from-orange-900 via-orange-600 to-orange-300";

          barShadow =
            "shadow-[0_0_30px_rgba(249,115,22,1)]";

          barBorder =
            "border-2 border-orange-200";
        }

        // ==================================================
        // 🟣 MINIMUM / CURRENT ELEMENT
        //
        // Used by Selection + Insertion only.
        // ==================================================

        if (
          isMinimum &&
          !isMoving
        ) {
          barClass =
            "bg-gradient-to-t from-violet-950 via-violet-700 to-violet-400";

          barShadow =
            "shadow-[0_0_40px_rgba(139,92,246,1)]";

          barBorder =
            "border-2 border-violet-200";
        }

        // ==================================================
        // SWAP ANIMATION
        // ==================================================

        const movingLeft =
          swapAnimation?.leftId === bar.id;

        const movingRight =
          swapAnimation?.rightId === bar.id;

        const isAnimating =
          movingLeft || movingRight;

        // ==================================================
        // RENDER
        // ==================================================

        return (
          <motion.div
            key={bar.id}
            initial={false}
            animate={{
              x: movingLeft
                ? barWidth + 3
                : movingRight
                ? -(barWidth + 3)
                : 0,

              y: isAnimating ? -8 : 0,

              scale: isAnimating ? 1.04 : 1,

              rotate: movingLeft
                ? -1.5
                : movingRight
                ? 1.5
                : 0,
            }}
            transition={{
              x: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },

              y: {
                duration: 0.2,
                ease: "easeOut",
              },

              scale: {
                duration: 0.2,
                ease: "easeOut",
              },

              rotate: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            className={`
              relative
              rounded-t-lg
              ${barClass}
              ${barShadow}
              ${barBorder}
              will-change-transform
              transition-all
              duration-150
            `}
            style={{
              width: `${barWidth}px`,
              height: `${bar.value}px`,
            }}
          >
            {/* TOP HIGHLIGHT */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-[2px]
                rounded-full
                bg-white/50
                pointer-events-none
              "
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default ArrayBars;