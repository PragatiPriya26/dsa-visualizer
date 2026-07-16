function ArrayBars({ array }) {
  return (
    <div className="flex justify-center items-end h-[450px] gap-1 px-6">
      {array.map((value, index) => (
        <div
          key={index}
          className="bg-cyan-400 w-5 rounded-t transition-all duration-300"
          style={{ height: `${value}px` }}
        ></div>
      ))}
    </div>
  );
}

export default ArrayBars;