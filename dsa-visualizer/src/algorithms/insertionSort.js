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
  setProgress,
  getIsPaused,
  getStopSorting,
  setSortingFinished
) {
  const arr = [...array];

  let comparisons = 0;
  let swaps = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function waitIfPaused() {
    while (getIsPaused()) {
      if (getStopSorting()) return false;
      await sleep(100);
    }
    return true;
  }

  setIsSorting(true);
  setSortingFinished(false);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setSortedBars([]);
  setMinBar(-1);

  for (let i = 1; i < arr.length; i++) {

    if (getStopSorting()) {
      cleanup();
      return;
    }

    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    setCurrentLine(1);

    const key = { ...arr[i] };
    let j = i - 1;

    setMinBar(i);

    while (j >= 0) {

      if (getStopSorting()) {
        cleanup();
        return;
      }

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

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

    arr[j + 1] = key;

    setCurrentLine(4);

    setArray([...arr]);

    setSortedBars(
      Array.from({ length: i + 1 }, (_, k) => k)
    );

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );

    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);

    await sleep(speed);
  }

  // Finished normally
  setSortedBars(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setProgress(100);

  setElapsedTime(
    Math.round(performance.now() - start)
  );

  setCurrentLine(0);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setSortingFinished(true);
  setIsSorting(false);

  function cleanup() {
    setCurrentLine(0);
    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setMinBar(-1);
    setProgress(0);
    setIsSorting(false);
  }
}