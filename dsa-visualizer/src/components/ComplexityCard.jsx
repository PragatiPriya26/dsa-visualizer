function ComplexityCard({ algorithm }) {
  const data = {
    // ==================================================
    // BUBBLE SORT
    // ==================================================

    bubble: {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inplace: "Yes",
    },

    // ==================================================
    // SELECTION SORT
    // ==================================================

    selection: {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "No",
      inplace: "Yes",
    },

    // ==================================================
    // INSERTION SORT
    // ==================================================

    insertion: {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      inplace: "Yes",
    },

    // ==================================================
    // MERGE SORT
    // ==================================================

    merge: {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
      stable: "Yes",
      inplace: "No",
    },
  };

  // ==================================================
  // SELECT ALGORITHM
  // ==================================================

  const algo = data[algorithm] || data.bubble;

  return (
    <div className="bg-[#102235] border border-slate-700 rounded-2xl p-4 shadow-xl">

      {/* ==================================================
          TITLE
      ================================================== */}

      <h2 className="text-lg font-bold text-cyan-300 mb-3">
        {algo.name}
      </h2>

      {/* ==================================================
          TIME & SPACE COMPLEXITY
      ================================================== */}

      <div className="space-y-2 text-sm">

        {/* Best */}
        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Best
          </span>

          <span className="text-green-400 font-semibold">
            {algo.best}
          </span>
        </div>

        {/* Average */}
        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Average
          </span>

          <span className="text-yellow-400 font-semibold">
            {algo.average}
          </span>
        </div>

        {/* Worst */}
        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Worst
          </span>

          <span className="text-red-400 font-semibold">
            {algo.worst}
          </span>
        </div>

        {/* Space */}
        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Space
          </span>

          <span className="text-cyan-400 font-semibold">
            {algo.space}
          </span>
        </div>

      </div>

      {/* ==================================================
          DIVIDER
      ================================================== */}

      <div className="border-t border-slate-700 my-3" />

      {/* ==================================================
          ALGORITHM PROPERTIES
      ================================================== */}

      <div className="grid grid-cols-2 gap-4 text-sm">

        {/* Stable */}
        <div>
          <span className="text-slate-400">
            Stable
          </span>

          <p
            className={`font-semibold ${
              algo.stable === "Yes"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {algo.stable}
          </p>
        </div>

        {/* In-place */}
        <div>
          <span className="text-slate-400">
            In-place
          </span>

          <p
            className={`font-semibold ${
              algo.inplace === "Yes"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {algo.inplace}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ComplexityCard;