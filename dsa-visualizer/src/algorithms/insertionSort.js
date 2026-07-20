export async function insertionSort(
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
  setProgress
) {
  const arr = [...array];

  let comparisons = 0;
  let swaps = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  setIsSorting(true);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setSortedBars([]);
  setMinBar(-1);

  for (let i = 1; i < arr.length; i++) {
    setCurrentLine(1);

    const key = { ...arr[i] };
    let j = i - 1;

    setMinBar(i);

    while (j >= 0) {
      setCurrentLine(2);

      setActiveBars([j, j + 1]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (arr[j].value <= key.value) break;

      setCurrentLine(3);

      setSwappingBars([j, j + 1]);

      arr[j + 1] = arr[j];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);

      j--;
    }

    setCurrentLine(4);

    arr[j + 1] = key;

    setArray([...arr]);

    // Mark current portion as sorted
    setSortedBars((prev) => {
      const next = [...prev];
      if (!next.includes(i)) {
        next.push(i);
      }
      return next;
    });

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );

    setActiveBars([]);
    setMinBar(-1);

    await sleep(speed);
  }

  // Ensure all bars become green
  setSortedBars(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setArray([...arr]);

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(100);

  const end = performance.now();
  setElapsedTime(Math.round(end - start));

  setIsSorting(false);
}