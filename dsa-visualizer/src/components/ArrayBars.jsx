import { motion } from "framer-motion";

function ArrayBars({
  array,
  activeBars,
  swappingBars,
  sortedBars,
  minBar,
  swapAnimation,
}) {
  return (
    <div className="relative flex justify-center items-end h-[420px] gap-[3px] px-6 border-b-2 border-slate-700">

      {array.map((bar, index) => {
        let color = "bg-gradient-to-t from-cyan-700 to-cyan-300";
        let extraClass = "";

        if (sortedBars.includes(index)) {
          color = "bg-gradient-to-t from-green-700 to-green-400";
        }

        else if (swappingBars.includes(index)) {
          color = "bg-gradient-to-t from-orange-700 to-orange-400";
          extraClass =
  "scale-110 ring-2 ring-orange-300 shadow-2xl shadow-orange-500/80"
        }

        else if (minBar === index) {
          color = "bg-gradient-to-t from-purple-700 to-purple-400";
          extraClass =
            "scale-110 shadow-xl shadow-purple-500/70 border border-purple-300";
        }

        else if (activeBars.includes(index)) {
          color = "bg-gradient-to-t from-red-700 to-red-400";
          extraClass =
            "scale-110 shadow-xl shadow-red-500/70";
        }
const movingLeft =
  swapAnimation?.leftId === bar.id;

const movingRight =
  swapAnimation?.rightId === bar.id;
        return (
         
  <motion.div
  key={bar.id}
  layout
  layoutId={bar.id}
  initial={false}
  animate={{
    y: movingLeft || movingRight ? -18 : 0,

    scale: movingLeft || movingRight
      ? 1.12
      : activeBars.includes(index)
      ? 1.05
      : 1,

    rotate:
      movingLeft
        ? -2
        : movingRight
        ? 2
        : 0,
  }}
  transition={{
    layout: {
      duration: 0.55,
      type: "spring",
      stiffness: 170,
      damping: 20,
    },

    y: {
      duration: 0.22,
    },

    scale: {
      duration: 0.2,
    },

    rotate: {
      duration: 0.2,
    },
  }}
  className={`rounded-t-xl ${color} ${extraClass}`}
  style={{
    width: `${Math.max(6, 520 / array.length)}px`,
    height: `${bar.value}px`,
  }}
/>
        );
      })}

    </div>
  );
}

export default ArrayBars;