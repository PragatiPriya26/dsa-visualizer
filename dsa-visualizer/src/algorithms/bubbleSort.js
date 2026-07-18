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
  setElapsedTime,
  setCurrentLine
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

    setCurrentLine(1);

    for (let j = 0; j < arr.length - i - 1; j++) {

      setCurrentLine(2);

      setActiveBars([j, j + 1]);
      setSwappingBars([]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      comparisons++;
      setComparisons(comparisons);

      setCurrentLine(3);

      if (arr[j].value > arr[j + 1].value) {

        setSwappingBars([j, j + 1]);

        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );

        setCurrentLine(4);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        swaps++;
        setSwaps(swaps);

        setArray([...arr]);

        await new Promise(resolve =>
          setTimeout(resolve, speed)
        );

        setSwappingBars([]);
      }

      setActiveBars([]);
    }

    setSortedBars(prev => [...prev, arr.length - i - 1]);
  }

  const end = performance.now();
  setElapsedTime(Math.round(end - start));

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);
  setIsSorting(false);
}