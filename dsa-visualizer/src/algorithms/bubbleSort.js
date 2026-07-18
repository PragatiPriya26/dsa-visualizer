export async function bubbleSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSwappingBars,
  setSortedBars,
  setIsSorting
) {
  const arr = [...array];

  setIsSorting(true);
  setSortedBars([]);
  setActiveBars([]);
  setSwappingBars([]);

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {

      // Highlight compared bars
      setActiveBars([j, j + 1]);
      setSwappingBars([]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      // Compare values
      if (arr[j].value > arr[j + 1].value) {

        // Highlight swapping bars
        setSwappingBars([j, j + 1]);

        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );

        // Swap objects
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        setArray([...arr]);

        // Keep orange visible
        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );

        setSwappingBars([]);
      }

      setActiveBars([]);
    }

    setSortedBars(prev => [...prev, arr.length - i - 1]);
  }

  setActiveBars([]);
  setSwappingBars([]);
  setIsSorting(false);
}