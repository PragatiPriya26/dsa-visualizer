function Controls({
  generateArray,
  startSorting,
  selectedAlgorithm,
  setSelectedAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  arrayType,
  setArrayType,
  isSorting,
  isPaused,
  togglePause,
  resetSorting,
}) {
  return (
    <div className="bg-[#102235] border border-slate-700 rounded-2xl shadow-xl p-4">

      <div className="flex flex-wrap items-center justify-between gap-5">

        {/* ================= LEFT CONTROLS ================= */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Generate */}
          <button
            onClick={generateArray}
            disabled={isSorting}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isSorting
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white"
            }`}
          >
            ↻ Generate
          </button>

          {/* Start */}
          <button
            onClick={startSorting}
            disabled={isSorting}
            className={`px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all duration-200 ${
              isSorting
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
            }`}
          >
            {isSorting ? "⏳ Sorting..." : "▶ Start"}
          </button>

          {/* Algorithm */}
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={isSorting}
            className={`bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white outline-none transition-all duration-200 ${
              isSorting
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
            }`}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
          </select>

          {/* Size */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">

            <span className="text-slate-300 text-sm font-medium">
              Size
            </span>

            <input
              type="range"
              min="10"
              max="80"
              value={arraySize}
              onChange={(e) =>
                setArraySize(Number(e.target.value))
              }
              disabled={isSorting}
              className="w-24 accent-cyan-500"
            />

            <span className="text-cyan-300 w-7 text-center text-sm font-bold">
              {arraySize}
            </span>

          </div>

          {/* Pause / Resume */}
          <button
            onClick={togglePause}
            disabled={!isSorting}
            className={`px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all duration-200 ${
              !isSorting
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : isPaused
                ? "bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30"
                : "bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30"
            }`}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>

          {/* Reset */}
          <button
            onClick={resetSorting}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 text-white font-semibold text-sm transition-all duration-200"
          >
            ↻ Reset
          </button>

        </div>

        {/* ================= RIGHT CONTROLS ================= */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Speed */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">

            <span className="text-slate-300 text-sm font-medium">
              Speed
            </span>

            <input
              type="range"
              min="10"
              max="300"
              value={speed}
              onChange={(e) =>
                setSpeed(Number(e.target.value))
              }
              disabled={isSorting}
              className="w-24 accent-cyan-500"
            />

            <span className="text-cyan-300 w-10 text-center text-sm font-bold">
              {speed}ms
            </span>

          </div>

          {/* Array Type */}
          <div className="flex items-center gap-2">

            <span className="text-slate-300 text-sm font-medium">
              Array
            </span>

            <select
              value={arrayType}
              onChange={(e) =>
                setArrayType(e.target.value)
              }
              disabled={isSorting}
              className={`bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white outline-none transition-all duration-200 ${
                isSorting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              }`}
            >
              <option value="random">Random</option>
              <option value="nearly">Nearly Sorted</option>
              <option value="reversed">Reversed</option>
              <option value="few">Few Unique</option>
            </select>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Controls;