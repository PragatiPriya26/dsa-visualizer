export async function bubbleSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSortedBars
) {
  const arr = [...array];
  setSortedBars([]);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setActiveBars([j, j + 1]);

await new Promise((resolve) =>
  setTimeout(resolve, speed)
);
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Update UI
        setArray([...arr]);

        // Wait according to slider value
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
    setSortedBars((prev) => [
      ...prev,
      arr.length - i - 1,
    ]);
  
  }
  
  setActiveBars([]);
}
