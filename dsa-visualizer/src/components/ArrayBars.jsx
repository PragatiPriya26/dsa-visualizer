import { motion } from "framer-motion";

function ArrayBars({
  array,
  activeBars,
  swappingBars,
  sortedBars,
  minBar,
  swapAnimation,
}) {
  const barWidth = Math.max(
    6,
    Math.min(24, 520 / Math.max(array.length, 1))
  );
console.log("BAR COUNT:", array.length);
  return (
    <div className="relative flex justify-center items-end h-[420px] gap-[3px] px-6 border-b-2 border-slate-700 overflow-hidden">

      {array.map((bar, index) => {
        let color =
          "bg-gradient-to-t from-cyan-700 to-cyan-300";

        let shadow = "";
        let border = "";

        /* =========================
           SORTED
        ========================= */
        if (sortedBars.includes(index)) {
          color =
            "bg-gradient-to-t from-green-700 to-green-400";

          shadow =
            "shadow-[0_0_14px_rgba(34,197,94,0.45)]";
        }

        /* =========================
           SWAPPING
        ========================= */
        else if (swappingBars.includes(index)) {
          color =
            "bg-gradient-to-t from-orange-700 to-orange-400";

          shadow =
            "shadow-[0_0_30px_rgba(251,146,60,0.9)]";

          border =
            "border border-orange-300";
        }

        /* =========================
           MINIMUM
        ========================= */
        else if (minBar === index) {
          color =
            "bg-gradient-to-t from-purple-700 to-purple-400";

          shadow =
            "shadow-[0_0_25px_rgba(168,85,247,0.8)]";

          border =
            "border border-purple-300";
        }

        /* =========================
           COMPARING
        ========================= */
        else if (activeBars.includes(index)) {
          color =
            "bg-gradient-to-t from-red-700 to-red-400";

          shadow =
            "shadow-[0_0_22px_rgba(239,68,68,0.8)]";
        }

        /* =========================
           SWAP ANIMATION
        ========================= */

        const movingLeft =
          swapAnimation?.leftId === bar.id;

        const movingRight =
          swapAnimation?.rightId === bar.id;

        const isMoving =
          movingLeft || movingRight;

        return (
          <motion.div
  key={`${bar.id}-${index}`}
            initial={false}

            animate={{
              x: movingLeft
                ? barWidth + 3
                : movingRight
                ? -(barWidth + 3)
                : 0,

              y: isMoving ? -8 : 0,

              scale: isMoving ? 1.03 : 1,

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
              ${color}
              ${shadow}
              ${border}
              will-change-transform
            `}

            style={{
              width: `${barWidth}px`,
              height: `${bar.value}px`,
            }}
          >

            {/* Top Highlight */}
            <div
              className="
                absolute
                inset-x-0
                top-0
                h-[2px]
                rounded-full
                bg-white/30
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