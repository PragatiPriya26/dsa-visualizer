export async function selectionSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSwappingBars,
  setMinBar,
  setSortedBars,
  setIsSorting,
  setComparisons,
  setSwaps,
  setElapsedTime,
  setCurrentLine,
  setProgress,
  isPaused
) {
  const arr = [...array];

  const start = performance.now();

  let comparisons = 0;
  let swaps = 0;

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);

  setSortedBars([]);
  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(0);

  setIsSorting(true);

  for (let i = 0; i < arr.length; i++) {

    // Line 1
    setCurrentLine(1);

    let minIndex = i;

    // Line 2
    setCurrentLine(2);
    setMinBar(minIndex);

    for (let j = i + 1; j < arr.length; j++) {

      // Line 3
      setCurrentLine(3);

      setActiveBars([minIndex, j]);
await waitIfPaused();
      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      comparisons++;
      setComparisons(comparisons);

      // Line 4
      setCurrentLine(4);

      if (arr[j].value < arr[minIndex].value) {

        minIndex = j;

        // Line 5
        setCurrentLine(5);

        setMinBar(minIndex);
      }

      setActiveBars([]);
    }

    // Swap only if needed
    if (minIndex !== i) {

      // Line 6
      setCurrentLine(6);

      setSwappingBars([i, minIndex]);
await waitIfPaused();
      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      [arr[i], arr[minIndex]] =
        [arr[minIndex], arr[i]];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);
await waitIfPaused();
      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      setSwappingBars([]);
    }

    setMinBar(-1);

    setSortedBars(prev => [...prev, i]);

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );
  }

  const end = performance.now();

  setElapsedTime(
    Math.round(end - start)
  );

  setCurrentLine(0);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(100);

  setIsSorting(false);
}