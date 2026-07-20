function TracePanel({
  algorithm,
  currentLine,
})  {
  const algorithms = {
    bubble: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",

      code: [
        "for i = 0 to n-1",
        "for j = 0 to n-i-1",
        "if arr[j] > arr[j+1]",
        "swap(arr[j], arr[j+1])",
      ],
    },

    selection: {
  best: "O(n²)",
  average: "O(n²)",
  worst: "O(n²)",
  space: "O(1)",

  code: [
    "for i = 0 to n-1",
    "min = i",
    "for j = i+1 to n-1",
    "if arr[j] < arr[min]",
    "min = j",
    "swap(arr[i], arr[min])",
  ],
},
insertion: {
  best: "O(n)",
  average: "O(n²)",
  worst: "O(n²)",
  space: "O(1)",

  code: [
  "for i = 1 to n-1",
  "while j >= 0 && arr[j] > key",
  "shift arr[j] to arr[j+1]",
  "insert key at correct position",
]
},
  };

  const current = algorithms[algorithm];

  return (
    <div className="bg-[#102235] border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

      <div className="px-6 py-4 border-b border-slate-700">

        <h2 className="text-cyan-300 tracking-[3px] font-semibold">
          TRACE
        </h2>

      </div>

      {/* Complexity */}
      <div className="grid grid-cols-4 text-center border-b border-slate-700">

        <div className="py-4">
          <p className="text-gray-400 text-sm">BEST</p>
          <p className="text-green-400 font-bold">{current.best}</p>
        </div>

        <div className="py-4">
          <p className="text-gray-400 text-sm">AVERAGE</p>
          <p className="text-white font-bold">{current.average}</p>
        </div>

        <div className="py-4">
          <p className="text-gray-400 text-sm">WORST</p>
          <p className="text-red-400 font-bold">{current.worst}</p>
        </div>

        <div className="py-4">
          <p className="text-gray-400 text-sm">SPACE</p>
          <p className="text-white font-bold">{current.space}</p>
        </div>

      </div>

      {/* Code */}
      <div className="p-6 font-mono text-[15px]">

        {current.code.map((line, index) => (
          <div
            key={index}
            className={`flex gap-6 py-2 rounded px-2 transition-all duration-300 ${
  currentLine === index + 1
    ? "bg-yellow-500/20 border-l-4 border-yellow-400 text-yellow-300"
    : "hover:bg-slate-800"
}`}
          >
            <span className="text-gray-500">
              {index + 1}
            </span>

            <span className="text-cyan-100">
              {line}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TracePanel;