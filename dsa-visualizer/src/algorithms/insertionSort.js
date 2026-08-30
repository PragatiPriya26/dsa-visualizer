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
  let writes = 0;

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

  function stopSortingCleanup() {
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

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);
  setSortingFinished(false);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);
  setSortedBars([]);

  // ==================================================
  // INSERTION SORT
  // ==================================================

  for (let i = 1; i < arr.length; i++) {
    // --------------------------------------------------
    // STOP
    // --------------------------------------------------

    if (getStopSorting()) {
      stopSortingCleanup();
      return;
    }

    // --------------------------------------------------
    // PAUSE
    // --------------------------------------------------

    if (!(await waitIfPaused())) {
      stopSortingCleanup();
      return;
    }

    // --------------------------------------------------
    // CURRENT KEY
    // --------------------------------------------------

    const key = arr[i];

    let j = i - 1;

    // 🟣 KEY / CURRENT ELEMENT
    setMinBar(i);

    setActiveBars([]);
    setSwappingBars([]);

    setCurrentLine(2);

    await sleep(speed);

    // --------------------------------------------------
    // SEARCH FOR POSITION
    // --------------------------------------------------

    while (j >= 0) {
      // ------------------------------------------------
      // STOP
      // ------------------------------------------------

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      // ------------------------------------------------
      // PAUSE
      // ------------------------------------------------

      if (!(await waitIfPaused())) {
        stopSortingCleanup();
        return;
      }

      // ------------------------------------------------
      // COMPARE
      // 🔴 CURRENT ELEMENT
      // 🟣 KEY REMAINS PURPLE
      // ------------------------------------------------

      setCurrentLine(3);

      setActiveBars([j]);

      // Keep key purple
      setMinBar(i);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      // ------------------------------------------------
      // SHIFT REQUIRED
      // ------------------------------------------------

      if (arr[j].value > key.value) {
        // ------------------------------------------------
        // 🟠 SHIFTING ELEMENT
        // ------------------------------------------------

        setCurrentLine(4);

        setActiveBars([]);

        setSwappingBars([j, j + 1]);

        await sleep(
          Math.max(50, speed * 0.6)
        );

        if (getStopSorting()) {
          stopSortingCleanup();
          return;
        }

        // ------------------------------------------------
        // SHIFT
        //
        // IMPORTANT:
        // Create a NEW ID.
        //
        // This prevents duplicate React keys.
        // ------------------------------------------------

        arr[j + 1] = {
          ...arr[j],
          id: crypto.randomUUID(),
        };

        writes++;
        setSwaps(writes);

        setArray([...arr]);

        await sleep(
          Math.max(50, speed * 0.7)
        );

        setSwappingBars([]);

        j--;

        // ------------------------------------------------
        // UPDATE KEY POSITION
        // ------------------------------------------------

        setMinBar(j + 1);

        // Keep key visually highlighted
        await sleep(
          Math.max(30, speed * 0.3)
        );
      } else {
        break;
      }
    }

    // --------------------------------------------------
    // INSERT KEY
    // --------------------------------------------------

    if (!(await waitIfPaused())) {
      stopSortingCleanup();
      return;
    }

    setCurrentLine(5);

    setActiveBars([]);

    setSwappingBars([]);

    // --------------------------------------------------
    // IMPORTANT
    //
    // Give the key a fresh ID so that React never
    // receives duplicate IDs after shifting.
    // --------------------------------------------------

    arr[j + 1] = {
      ...key,
      id: crypto.randomUUID(),
    };

    writes++;
    setSwaps(writes);

    // Purple key position
    setMinBar(j + 1);

    setArray([...arr]);

    await sleep(
      Math.max(60, speed * 0.7)
    );

    // --------------------------------------------------
    // SORTED PORTION
    // --------------------------------------------------

    setCurrentLine(6);

    setMinBar(-1);

    setActiveBars([]);
    setSwappingBars([]);

    // Everything from 0 → i is sorted
    const sorted = [];

    for (let k = 0; k <= i; k++) {
      sorted.push(k);
    }

    setSortedBars(sorted);

    // --------------------------------------------------
    // PROGRESS
    // --------------------------------------------------

    setProgress(
      Math.round(
        ((i + 1) / arr.length) * 100
      )
    );

    await sleep(
      Math.max(30, speed * 0.3)
    );
  }

  // ==================================================
  // FINAL STATE
  // ==================================================

  setArray([...arr]);

  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, index) => index
    )
  );

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

  setSortingFinished(true);
  setIsSorting(false);
}