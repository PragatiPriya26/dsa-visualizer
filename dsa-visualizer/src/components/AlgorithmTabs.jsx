function AlgorithmTabs({
  selectedAlgorithm,
  setSelectedAlgorithm,
}) {
  const algorithms = [
    "Bubble",
    "Selection",
    "Insertion",
    
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-8">

      {algorithms.map((algo) => (

        <button
          key={algo}
          onClick={() =>
            setSelectedAlgorithm(
              algo.toLowerCase()
            )
          }
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300

          ${
            selectedAlgorithm === algo.toLowerCase()
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <button
  onClick={() => setSelectedAlgorithm("merge")}
  className={`px-4 py-2 rounded-lg transition ${
    selectedAlgorithm === "merge"
      ? "bg-cyan-500 text-white"
      : "bg-slate-700 text-slate-300"
  }`}
>
  Merge Sort
</button>
          {algo}
        </button>

      ))}

    </div>
  );
}

export default AlgorithmTabs;