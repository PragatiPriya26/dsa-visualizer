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
  let shifts = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ---------------------------------------------
  // PAUSE HANDLER
  // ---------------------------------------------
  async function waitIfPaused() {
    while (getIsPaused()) {
      if (getStopSorting()) {
        return false;
      }

      await sleep(50);
    }

    return !getStopSorting();
  }

  // ---------------------------------------------
  // CLEANUP
  // ---------------------------------------------
  function cleanup() {
    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);
    setCurrentLine(0);
    setIsSorting(false);
  }

  // ---------------------------------------------
  // START
  // ---------------------------------------------
  setIsSorting(true);
  setSortingFinished(false);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);
  setSortedBars([]);

  // ---------------------------------------------
  // INSERTION SORT
  // ---------------------------------------------
  for (let i = 1; i < arr.length; i++) {

    // Stop
    if (getStopSorting()) {
      cleanup();
      return;
    }

    // Pause
    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    setCurrentLine(1);

    // Current element being inserted
    const key = arr[i];

    setMinBar(i);

    await sleep(speed * 0.5);

    let j = i - 1;

    // -------------------------------------------
    // FIND CORRECT POSITION
    // -------------------------------------------
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

      // Highlight comparison
      setActiveBars([j, j + 1]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      // Correct position found
      if (arr[j].value <= key.value) {
        break;
      }

      // -----------------------------------------
      // SHIFT ELEMENT TO RIGHT
      // -----------------------------------------
      setCurrentLine(3);

      setSwappingBars([j, j + 1]);

      await sleep(speed * 0.5);

      arr[j + 1] = arr[j];

      shifts++;
      setSwaps(shifts);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);

      j--;
    }

    // -------------------------------------------
    // INSERT KEY
    // -------------------------------------------
    arr[j + 1] = key;

    setArray([...arr]);

    setCurrentLine(4);

    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);

    // Everything from 0 → i is sorted
    setSortedBars(
      Array.from({ length: i + 1 }, (_, index) => index)
    );

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );

    await sleep(speed * 0.5);
  }

  // ---------------------------------------------
  // SORTING COMPLETE
  // ---------------------------------------------
  setSortedBars(
    Array.from({ length: arr.length }, (_, index) => index)
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
}