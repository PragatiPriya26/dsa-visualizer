import { motion } from "framer-motion";

function ArrayBars({
  array,
  activeBars,
  swappingBars,
  sortedBars,
  minBar,
})  {
  return (
    <div className="relative flex justify-center items-end h-[340px] gap-[2px] px-4 border-b-2 border-slate-600">
      {array.map((bar, index) => {
        let color = "bg-cyan-400";
        let extraClass = "";

        if (sortedBars.includes(index)) {
  color = "bg-green-500";
}
else if (swappingBars.includes(index)) {
  color = "bg-orange-500";
  extraClass =
    "scale-125 shadow-2xl shadow-orange-500/80 border border-orange-300";
}
else if (minBar === index) {
  color = "bg-purple-500";
  extraClass =
    "scale-110 shadow-xl shadow-purple-500/70 border border-purple-300";
}
else if (activeBars.includes(index)) {
  color = "bg-red-500";
  extraClass =
    "scale-110 shadow-xl shadow-red-500/60";
}

        return (
          <motion.div
            key={bar.id}
            layout
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
            className={`w-4 rounded-t-lg transition-all duration-300 ${color} ${extraClass}`}
            style={{
              height: `${bar.value}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ArrayBars;