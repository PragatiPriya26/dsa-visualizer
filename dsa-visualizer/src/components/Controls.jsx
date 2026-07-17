function Controls({
  generateArray,
  bubbleSort,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
}) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 mt-8 mx-auto max-w-6xl">

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={generateArray}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Generate Array
        </button>

        <button
          onClick={bubbleSort}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Bubble Sort
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition">
          Selection Sort
        </button>

        <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold transition">
          Insertion Sort
        </button>

      </div>

      <div className="mt-8 space-y-6">

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
          />
        </div>

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
          />
        </div>

      </div>

    </div>
  );
}

export default Controls;