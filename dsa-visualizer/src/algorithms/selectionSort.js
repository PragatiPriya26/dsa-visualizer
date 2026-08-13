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
    setIsSorting(false);
  }

  // ==================================================
  // START
  // ==================================================

  setIsSorting(true);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);
  setSortedBars([]);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  // ==================================================
  // SELECTION SORT
  // ==================================================

  for (let i = 0; i < arr.length - 1; i++) {
    // ----------------------------------------------
    // STOP
    // ----------------------------------------------

    if (getStopSorting()) {
      cleanup();
      return;
    }

    // ----------------------------------------------
    // PAUSE
    // ----------------------------------------------

    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    // ----------------------------------------------
    // CURRENT MINIMUM
    // ----------------------------------------------

    let minIndex = i;

    // 🟣 Purple minimum
    setMinBar(minIndex);

    // Nothing being compared yet
    setActiveBars([]);

    setCurrentLine(1);

    await sleep(speed);

    // ----------------------------------------------
    // SEARCH FOR MINIMUM
    // ----------------------------------------------

    for (let j = i + 1; j < arr.length; j++) {
      // --------------------------------------------
      // STOP / PAUSE
      // --------------------------------------------

      if (getStopSorting()) {
        cleanup();
        return;
      }

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      // --------------------------------------------
      // 🔴 COMPARE j WITH CURRENT MINIMUM
      // --------------------------------------------

      setCurrentLine(2);

      // Only j is red
      setActiveBars([j]);

      // Current minimum remains purple
      setMinBar(minIndex);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // --------------------------------------------
      // NEW MINIMUM
      // --------------------------------------------

      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;

        // 🟣 Purple moves to new minimum
        setMinBar(minIndex);

        // Remove red
        setActiveBars([]);

        await sleep(
          Math.max(50, speed * 0.5)
        );
      }
    }

    // ----------------------------------------------
    // PREPARE SWAP
    // ----------------------------------------------

    setCurrentLine(3);

    setActiveBars([]);

    // Keep minimum purple
    setMinBar(minIndex);

    await sleep(
      Math.max(50, speed * 0.5)
    );

    if (getStopSorting()) {
      cleanup();
      return;
    }

    // ----------------------------------------------
    // SWAP
    // ----------------------------------------------

    if (minIndex !== i) {
      // 🟠 Moving elements
      setSwappingBars([
        i,
        minIndex,
      ]);

      await sleep(
        Math.max(60, speed * 0.5)
      );

      [arr[i], arr[minIndex]] = [
        arr[minIndex],
        arr[i],
      ];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);
    }

    // ----------------------------------------------
    // POSITION i IS SORTED
    // ----------------------------------------------

    setMinBar(-1);
    setActiveBars([]);

    // Create sorted array explicitly
    const newSortedBars = [];

    for (let k = 0; k <= i; k++) {
      newSortedBars.push(k);
    }

    setSortedBars(newSortedBars);

    // ----------------------------------------------
    // PROGRESS
    // ----------------------------------------------

    setProgress(
      Math.round(
        ((i + 1) / arr.length) * 100
      )
    );

    await sleep(
      Math.max(30, speed * 0.4)
    );
  }

  // ==================================================
  // FINAL ELEMENT
  // ==================================================

  setArray([...arr]);

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

  // ==================================================
  // TIME
  // ==================================================

  setElapsedTime(
    Math.round(
      performance.now() - start
    )
  );

  setCurrentLine(0);

  // ==================================================
  // COMPLETE
  // ==================================================

  setIsSorting(false);
}