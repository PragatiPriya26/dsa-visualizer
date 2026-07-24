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
  getIsPaused,
  getStopSorting
) {
  const arr = [...array];

  let comparisons = 0;
  let swaps = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function waitIfPaused() {
    while (getIsPaused()) {
      if (getStopSorting()) return;
      await sleep(100);
    }
  }

  setIsSorting(true);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setSortedBars([]);
  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  for (let i = 0; i < arr.length; i++) {

    if (getStopSorting()) {
      setCurrentLine(0);
      setActiveBars([]);
      setSwappingBars([]);
      setMinBar(-1);
      setIsSorting(false);
      return;
    }

    await waitIfPaused();

    if (getStopSorting()) {
      setCurrentLine(0);
      setActiveBars([]);
      setSwappingBars([]);
      setMinBar(-1);
      setIsSorting(false);
      return;
    }

    setCurrentLine(1);

    let minIndex = i;

    setCurrentLine(2);
    setMinBar(minIndex);

    for (let j = i + 1; j < arr.length; j++) {

      if (getStopSorting()) {
        setCurrentLine(0);
        setActiveBars([]);
        setSwappingBars([]);
        setMinBar(-1);
        setIsSorting(false);
        return;
      }

      await waitIfPaused();

      if (getStopSorting()) {
        setCurrentLine(0);
        setActiveBars([]);
        setSwappingBars([]);
        setMinBar(-1);
        setIsSorting(false);
        return;
      }

      setCurrentLine(3);

      setActiveBars([minIndex, j]);

      await sleep(speed);

      comparisons++;
      setComparisons(comparisons);

      setCurrentLine(4);

      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;

        setCurrentLine(5);

        setMinBar(minIndex);
      }

      setActiveBars([]);
    }

    if (minIndex !== i) {

      await waitIfPaused();

      if (getStopSorting()) {
        setCurrentLine(0);
        setActiveBars([]);
        setSwappingBars([]);
        setMinBar(-1);
        setIsSorting(false);
        return;
      }

      setCurrentLine(6);

      setSwappingBars([i, minIndex]);

      await sleep(speed);

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);
    }

    setMinBar(-1);

    setSortedBars((prev) => [...prev, i]);

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );
  }

  const end = performance.now();

  setElapsedTime(Math.round(end - start));

  setSortedBars(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(100);

  setIsSorting(false);
}