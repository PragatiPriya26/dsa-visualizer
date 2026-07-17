function ArrayBars({
  array,
  activeBars,
  sortedBars,
})  {
  return (
    <div className="flex justify-center items-end h-[450px] gap-1 px-6">

      {array.map((value, index) => (
        <div
          key={index}
         className={`w-5 rounded-t transition-all duration-200 ${
  sortedBars.includes(index)
    ? "bg-green-500"
    : activeBars.includes(index)
    ? "bg-red-500"
    : "bg-cyan-400"
}`}
          style={{
            height: `${value}px`,
          }}
        ></div>
      ))}

    </div>
  );
}

export default ArrayBars;