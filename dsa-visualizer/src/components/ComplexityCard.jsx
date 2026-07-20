function ComplexityCard({ algorithm }) {
  const data = {
    bubble: {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inplace: "Yes",
    },

    selection: {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "No",
      inplace: "Yes",
    },

    insertion: {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inplace: "Yes",
    },
  };

  const algo = data[algorithm] || data.bubble;

  return (
    <div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

      <h2 className="text-lg font-bold text-cyan-300 mb-3">
        {algo.name}
      </h2>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Best</span>
          <span className="text-green-400">{algo.best}</span>
        </div>

        <div className="flex justify-between">
          <span>Average</span>
          <span className="text-yellow-400">{algo.average}</span>
        </div>

        <div className="flex justify-between">
          <span>Worst</span>
          <span className="text-red-400">{algo.worst}</span>
        </div>

        <div className="flex justify-between">
          <span>Space</span>
          <span className="text-cyan-400">{algo.space}</span>
        </div>

      </div>

      <div className="border-t border-slate-700 my-3"></div>

      <div className="flex justify-between text-sm">

        <div>
          <span className="text-slate-400">Stable</span>
          <p className="font-semibold text-green-400">
            {algo.stable}
          </p>
        </div>

        <div>
          <span className="text-slate-400">In-place</span>
          <p className="font-semibold text-green-400">
            {algo.inplace}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ComplexityCard;