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
            "scale-125 shadow-2xl shadow-orange-500/80 border border-orange-300 z-20";
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

        return (
         <motion.div
  key={bar.id}
  layout
  layoutId={bar.id}
  initial={false}
  animate={{
    x:
      swapAnimation?.left === index
        ? 25
        : swapAnimation?.right === index
        ? -25
        : 0,

    scale: swappingBars.includes(index) ? 1.08 : 1,
  }}
  transition={{
    x: {
      duration: 0.25,
      ease: "easeInOut",
    },
    layout: {
      type: "spring",
      stiffness: 220,
      damping: 24,
    },
  }}
  className={`rounded-t-xl transition-all duration-300 ${color} ${extraClass}`}
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