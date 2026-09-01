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

    // --------------------------------------------------
    // STOP
    // --------------------------------------------------

    if (getStopSorting()) {
      cleanup();
      return;
    }

    // --------------------------------------------------
    // PAUSE
    // --------------------------------------------------

    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    // ==================================================
    // LINE 1
    // for (i = 0; i < n - 1; i++)
    // ==================================================

    setCurrentLine(1);

    await sleep(
      Math.max(20, speed * 0.25)
    );

    // ==================================================
    // CURRENT MINIMUM
    // ==================================================

    let minIndex = i;

    // ==================================================
    // LINE 2
    // minIndex = i
    //
    // 🟣 PURPLE
    // ==================================================

    setCurrentLine(2);

    setMinBar(minIndex);
    setActiveBars([]);
    setSwappingBars([]);

    await sleep(speed);

    // ==================================================
    // SEARCH FOR MINIMUM
    // ==================================================

    for (
      let j = i + 1;
      j < arr.length;
      j++
    ) {

      // ------------------------------------------------
      // STOP
      // ------------------------------------------------

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // ------------------------------------------------
      // PAUSE
      // ------------------------------------------------

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      // ==================================================
      // LINE 3
      // ==================================================

      setCurrentLine(3);

      // ==================================================
      // LINE 4
      // Compare
      //
      // 🔴 j
      // 🟣 minIndex
      // ==================================================

      setCurrentLine(4);

      setActiveBars([j]);
      setMinBar(minIndex);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // ==================================================
      // NEW MINIMUM
      // ==================================================

      if (
        arr[j].value <
        arr[minIndex].value
      ) {

        // ==================================================
        // LINE 6
        // Update minIndex
        // ==================================================

        setCurrentLine(6);

        minIndex = j;

        setMinBar(minIndex);

        setActiveBars([]);

        await sleep(
          Math.max(50, speed * 0.5)
        );
      }
    }

    // ==================================================
    // PREPARE SWAP
    // ==================================================

    setActiveBars([]);
    setMinBar(minIndex);

    // ==================================================
    // LINE 7
    // Swap array[i] and array[minIndex]
    // ==================================================

    setCurrentLine(7);

    await sleep(
      Math.max(50, speed * 0.5)
    );

    if (getStopSorting()) {
      cleanup();
      return;
    }

    // ==================================================
    // SWAP
    // ==================================================

    if (minIndex !== i) {

      setSwappingBars([
        i,
        minIndex,
      ]);

      setMinBar(minIndex);

      await sleep(
        Math.max(60, speed * 0.5)
      );

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // ==================================================
      // ACTUAL SWAP
      // ==================================================

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

    // ==================================================
    // POSITION i IS NOW PERMANENTLY SORTED
    // ==================================================

    setMinBar(-1);
    setActiveBars([]);
    setSwappingBars([]);

    // IMPORTANT:
    // Explicitly mark 0 -> i as sorted.
    // This guarantees the first bar remains green.

    const sortedPrefix = Array.from(
      { length: i + 1 },
      (_, index) => index
    );

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
      Math.max(30, speed * 0.4)
    );
  }

  // ==================================================
  // FINAL ELEMENT
  // ==================================================

  if (!(await waitIfPaused())) {
    cleanup();
    return;
  }

  setCurrentLine(7);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  // ==================================================
  // EVERYTHING IS SORTED
  // ==================================================

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, index) => index
    )
  );

  setArray([...arr]);

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