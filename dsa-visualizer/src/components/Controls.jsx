function Controls({
  generateArray,
  bubbleSort,
  selectionSort,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  arrayType,
  setArrayType,
  isSorting,
}) {
  return (
    <div className="bg-[#102235] border border-slate-700 rounded-2xl shadow-xl p-4">

      <div className="flex flex-wrap items-center justify-between gap-6">

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={generateArray}
            disabled={isSorting}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isSorting
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            Generate
          </button>

          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isSorting
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            Bubble
          </button>

          <button
            onClick={selectionSort}
            disabled={isSorting}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isSorting
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            Selection
          </button>

        </div>

        {/* Array Size */}
        <div className="flex items-center gap-3">

          <span className="text-white font-medium">
            Size
          </span>

          <input
            type="range"
            min="10"
            max="80"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
            className="w-32 accent-cyan-500"
          />

          <span className="text-cyan-300 w-8 text-center">
            {arraySize}
          </span>

        </div>

        {/* Speed */}
        <div className="flex items-center gap-3">

          <span className="text-white font-medium">
            Speed
          </span>

          <input
            type="range"
            min="10"
            max="300"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
            className="w-32 accent-cyan-500"
          />

          <span className="text-cyan-300 w-10 text-center">
            {speed}
          </span>

        </div>

        {/* Array Type */}
        <div className="flex items-center gap-3">

          <span className="text-white font-medium">
            Array
          </span>

          <select
            value={arrayType}
            onChange={(e) => setArrayType(e.target.value)}
            disabled={isSorting}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="random">Random</option>
            <option value="nearly">Nearly Sorted</option>
            <option value="reversed">Reversed</option>
            <option value="few">Few Unique</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default Controls;