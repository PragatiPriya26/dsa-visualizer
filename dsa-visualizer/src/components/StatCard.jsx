function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-5 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">

      <div className="flex items-center gap-3">

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-white">
            {value}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default StatCard;