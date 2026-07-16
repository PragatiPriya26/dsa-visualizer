function Controls({ generateArray,bubbleSort }) {
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
         className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold transition">
          Bubble Sort
        </button>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition">
          Selection Sort
        </button>

        <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold transition">
          Insertion Sort
        </button>

      </div>
    </div>
  );
}

export default Controls;