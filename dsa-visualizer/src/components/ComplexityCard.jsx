import algorithmInfo from "../data/algorithmInfo";

function ComplexityCard({ algorithm }) {
  const info = algorithmInfo[algorithm];

  return (
    <div className="max-w-md mx-auto mt-8 bg-slate-800 rounded-xl shadow-lg p-6 text-white">

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        {info.name}
      </h2>

      <div className="space-y-2">

        <p>
          <span className="font-semibold">Best Case:</span> {info.best}
        </p>

        <p>
          <span className="font-semibold">Average Case:</span> {info.average}
        </p>

        <p>
          <span className="font-semibold">Worst Case:</span> {info.worst}
        </p>

        <p>
          <span className="font-semibold">Space Complexity:</span> {info.space}
        </p>

        <p>
          <span className="font-semibold">Stable:</span> {info.stable}
        </p>

      </div>

    </div>
  );
}

export default ComplexityCard;