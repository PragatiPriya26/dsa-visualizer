function Controls({
  generateArray,
  bubbleSort,
  selectionSort,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  isSorting,
  isPaused,
  setIsPaused,
}) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 mt-8 mx-auto max-w-6xl">

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">

        {/* Generate Array */}
        <button
          onClick={generateArray}
          disabled={isSorting}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            isSorting
              ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-60"
              : "bg-cyan-500 hover:bg-cyan-600 text-white"
          }`}
        >
          Generate Array
        </button>

        {/* Bubble Sort */}
        <button
          onClick={bubbleSort}
          disabled={isSorting}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            isSorting
              ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-60"
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
          }`}
        >
          Bubble Sort
        </button>
<button
  onClick={() => setIsPaused(!isPaused)}
  disabled={!isSorting}
  className={`px-5 py-2 rounded-lg font-semibold transition ${
    !isSorting
      ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-60"
      : "bg-yellow-500 hover:bg-yellow-600 text-white"
  }`}
>
  {isPaused ? "Resume" : "Pause"}
</button>
        {/* Selection Sort */}
        <button
          onClick={selectionSort}
          disabled={isSorting}
          className={`px-5 py-2 rounded-lg font-semibold transition ${
            isSorting
              ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-60"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          Selection Sort
        </button>

        {/* Insertion Sort */}
        <button
          disabled
          className="bg-purple-500 text-white px-5 py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed"
        >
          Insertion Sort (Coming Soon)
        </button>

      </div>

      {/* Sliders */}
      <div className="mt-8 space-y-6">

        {/* Array Size */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Array Size: {arraySize}
          </label>

          <input
            type="range"
            min="10"
            max="80"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-full cursor-pointer"
            disabled={isSorting}
          />
        </div>

        {/* Speed */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Speed: {speed} ms
          </label>

          <input
            type="range"
            min="10"
            max="300"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full cursor-pointer"
            disabled={isSorting}
          />
        </div>

      </div>

    </div>
  );
}

export default Controls;