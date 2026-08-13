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

  // ==================================================
  // SLEEP
  // ==================================================

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ==================================================
  // PAUSE / STOP
  // ==================================================

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

  // ==================================================
  // CLEANUP
  // ==================================================

  function cleanup() {
    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);
    setSortedBars([]);

    setCurrentLine(0);
    setProgress(0);

    setSortingFinished(false);
    setIsSorting(false);
  }

  // ==================================================
  // START
  // ==================================================

  setIsSorting(true);
  setSortingFinished(false);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  // ==================================================
  // IMPORTANT:
  // First element is already sorted
  // ==================================================

  if (arr.length > 0) {
    setSortedBars([0]);
    setProgress(
      Math.round((1 / arr.length) * 100)
    );

    await sleep(Math.max(50, speed * 0.5));
  }

  // ==================================================
  // INSERTION SORT
  // ==================================================

  for (let i = 1; i < arr.length; i++) {

    // ==================================================
    // STOP / PAUSE
    // ==================================================

    if (getStopSorting()) {
      cleanup();
      return;
    }

    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    // ==================================================
    // CURRENT ELEMENT
    // 🟣 PURPLE
    // ==================================================

    setCurrentLine(1);

    setActiveBars([]);
    setSwappingBars([]);

    // Current element being inserted
    setMinBar(i);

    await sleep(speed);

    if (getStopSorting()) {
      cleanup();
      return;
    }

    // ==================================================
    // INSERT INTO SORTED PART
    // ==================================================

    let j = i;

    while (j > 0) {

      // ==================================================
      // STOP / PAUSE
      // ==================================================

      if (getStopSorting()) {
        cleanup();
        return;
      }

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      // ==================================================
      // 🔴 COMPARE
      // ==================================================

      setCurrentLine(2);

      setActiveBars([
        j - 1,
        j,
      ]);

      // Keep current element purple
      setMinBar(j);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // ==================================================
      // ELEMENT ALREADY IN CORRECT POSITION
      // ==================================================

      if (
        arr[j - 1].value <=
        arr[j].value
      ) {
        break;
      }

      // ==================================================
      // 🟠 MOVE / SHIFT
      // ==================================================

      setCurrentLine(3);

      setActiveBars([]);

      setSwappingBars([
        j - 1,
        j,
      ]);

      await sleep(
        Math.max(40, speed * 0.5)
      );

      // ==================================================
      // SWAP
      // ==================================================

      [arr[j - 1], arr[j]] = [
        arr[j],
        arr[j - 1],
      ];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      setSwappingBars([]);

      j--;

      // Keep the inserted element purple
      setMinBar(j);
    }

    // ==================================================
    // CURRENT PREFIX IS NOW SORTED
    // ==================================================

    setCurrentLine(4);

    setActiveBars([]);
    setSwappingBars([]);

    // Remove purple after it reaches its position
    setMinBar(-1);

    // ==================================================
    // MARK SORTED PREFIX
    // ==================================================

    const sortedPrefix = [];

    for (let k = 0; k <= i; k++) {
      sortedPrefix.push(k);
    }

    setSortedBars(sortedPrefix);

    // ==================================================
    // PROGRESS
    // ==================================================

    setProgress(
      Math.round(
        ((i + 1) / arr.length) * 100
      )
    );

    await sleep(
      Math.max(40, speed * 0.5)
    );
  }

  // ==================================================
  // COMPLETED
  // ==================================================

  setArray([...arr]);

  // Everything green
  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, index) => index
    )
  );

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(100);

  setElapsedTime(
    Math.round(
      performance.now() - start
    )
  );

  setCurrentLine(0);

  setSortingFinished(true);
  setIsSorting(false);
}