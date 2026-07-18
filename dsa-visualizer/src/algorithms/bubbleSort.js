export async function bubbleSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSwappingBars,
  setSortedBars,
  setIsSorting,
  setComparisons,
  setSwaps,
  setElapsedTime
) {
  const start = performance.now();

let comparisons = 0;
let swaps = 0;

setComparisons(0);
setSwaps(0);
setElapsedTime(0);
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
comparisons++;
setComparisons(comparisons);
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
        swaps++;
setSwaps(swaps);

        // Keep orange visible
        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );

        setSwappingBars([]);
      }

      setActiveBars([]);
    }

    setSortedBars(prev => [...prev, arr.length - i - 1]);
    const end = performance.now();

setElapsedTime(Math.round(end - start));
  }

  setActiveBars([]);
  setSwappingBars([]);
  setIsSorting(false);
}