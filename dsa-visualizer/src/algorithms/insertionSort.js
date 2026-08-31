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

    // --------------------------------------------------
    // KEY
    // --------------------------------------------------

    const key = arr[i];

    let j = i - 1;

    // 🟣 KEY
    setMinBar(i);

    setActiveBars([]);
    setSwappingBars([]);

    setCurrentLine(2);

    await sleep(speed);

    // --------------------------------------------------
    // FIND CORRECT POSITION
    // --------------------------------------------------

    while (j >= 0) {

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

      // ------------------------------------------------
      // COMPARE
      // ------------------------------------------------

      setCurrentLine(3);

      // 🔴 Element being compared
      setActiveBars([j]);

      // 🟣 Key
      setMinBar(i);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      // ------------------------------------------------
      // SHIFT
      // ------------------------------------------------

      if (arr[j].value > key.value) {

        setCurrentLine(4);

        // Remove comparison color
        setActiveBars([]);

        // 🟠 Shift animation
        setSwappingBars([j, j + 1]);

        await sleep(
          Math.max(50, speed * 0.5)
        );

        if (getStopSorting()) {
          cleanup();
          return;
        }

        // ------------------------------------------------
        // SHIFT ELEMENT
        //
        // IMPORTANT:
        // Give the copied element a NEW ID.
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
          Math.max(50, speed * 0.6)
        );

        setSwappingBars([]);

        j--;

        // Keep purple key position visible
        setMinBar(j + 1);

        await sleep(
          Math.max(30, speed * 0.25)
        );

      } else {

        break;
      }
    }

    // --------------------------------------------------
    // INSERT KEY
    // --------------------------------------------------

    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    setCurrentLine(5);

    setActiveBars([]);
    setSwappingBars([]);

    // --------------------------------------------------
    // Insert the ORIGINAL key object.
    //
    // Its ID remains unique because the old position
    // is being replaced.
    // --------------------------------------------------

    arr[j + 1] = key;

    writes++;
    setSwaps(writes);

    // 🟣 Key position
    setMinBar(j + 1);

    setArray([...arr]);

    await sleep(
      Math.max(60, speed * 0.7)
    );

    // --------------------------------------------------
    // MARK SORTED PORTION
    // --------------------------------------------------

    setCurrentLine(6);

    setMinBar(-1);
    setActiveBars([]);
    setSwappingBars([]);

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
  // COMPLETE
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
  // FINISHED
  // ==================================================

  setSortingFinished(true);
  setIsSorting(false);
}