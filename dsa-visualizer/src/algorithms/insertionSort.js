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

  // ---------------------------------------------
  // PAUSE / STOP CHECK
  // ---------------------------------------------

  async function waitIfPaused() {
    while (getIsPaused()) {
      if (getStopSorting()) {
        return false;
      }

      await sleep(50);
    }

    if (getStopSorting()) {
      return false;
    }

    return true;
  }

  // ---------------------------------------------
  // CLEANUP
  // ---------------------------------------------

  function cleanup() {
    setCurrentLine(0);
    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);
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
  setSortedBars([]);
  setMinBar(-1);

  // ---------------------------------------------
  // INSERTION SORT
  // ---------------------------------------------

  for (let i = 1; i < arr.length; i++) {
    // Stop check
    if (getStopSorting()) {
      cleanup();
      return;
    }

    // Pause check
    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    setCurrentLine(1);

    // Current element being inserted
    let j = i;

    setMinBar(i);

    // -------------------------------------------
    // Move current element left using swaps
    // -------------------------------------------

    while (j > 0) {
      // Stop check
      if (getStopSorting()) {
        cleanup();
        return;
      }

      // Pause check
      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      setCurrentLine(2);

      // Highlight elements being compared
      setActiveBars([j - 1, j]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      // -----------------------------------------
      // Already in correct position
      // -----------------------------------------

      if (arr[j - 1].value <= arr[j].value) {
        break;
      }

      // -----------------------------------------
      // SWAP
      // -----------------------------------------

      setCurrentLine(3);

      setSwappingBars([j - 1, j]);

      await sleep(speed / 2);

      // Adjacent swap
      [arr[j - 1], arr[j]] = [
        arr[j],
        arr[j - 1],
      ];

      swaps++;
      setSwaps(swaps);

      // IMPORTANT:
      // Every object keeps its own unique ID.
      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);

      j--;
    }

    // -------------------------------------------
    // Current pass completed
    // -------------------------------------------

    setCurrentLine(4);

    setArray([...arr]);

    setSortedBars(
      Array.from(
        { length: i + 1 },
        (_, index) => index
      )
    );

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );

    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);

    await sleep(speed / 2);
  }

  // ---------------------------------------------
  // FINISHED
  // ---------------------------------------------

  setArray([...arr]);

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, index) => index
    )
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