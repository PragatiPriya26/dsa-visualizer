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
      if (getStopSorting()) return false;

      await sleep(50);
    }

    return !getStopSorting();
  }

  function cleanup() {
    setCurrentLine(0);
    setActiveBars([]);
    setSwappingBars([]);
    setMinBar(-1);
    setIsSorting(false);
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

  /* =========================
     SELECTION SORT
  ========================= */

  for (let i = 0; i < arr.length; i++) {

    /* Stop */
    if (getStopSorting()) {
      cleanup();
      return;
    }

    /* Pause */
    if (!(await waitIfPaused())) {
      cleanup();
      return;
    }

    setCurrentLine(1);

    let minIndex = i;

    /* -------------------------
       Initial minimum
    ------------------------- */

    setCurrentLine(2);

    setMinBar(minIndex);

    // Give the minimum marker time to appear
    await sleep(speed * 0.5);

    /* -------------------------
       Find minimum
    ------------------------- */

    for (let j = i + 1; j < arr.length; j++) {

      if (getStopSorting()) {
        cleanup();
        return;
      }

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      setCurrentLine(3);

      /* Compare */
      setActiveBars([minIndex, j]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      /* -------------------------
         New minimum found
      ------------------------- */

      if (arr[j].value < arr[minIndex].value) {

        minIndex = j;

        setCurrentLine(4);

        // Move minimum marker
        setMinBar(minIndex);

        // Small pause so user can see it
        await sleep(speed * 0.45);
      }

      setActiveBars([]);
    }

    /* -------------------------
       Swap minimum into position
    ------------------------- */

    if (minIndex !== i) {

      if (!(await waitIfPaused())) {
        cleanup();
        return;
      }

      if (getStopSorting()) {
        cleanup();
        return;
      }

      setCurrentLine(5);

      /* Highlight the two bars */
      setSwappingBars([i, minIndex]);

      // Remove minimum marker during swap
      setMinBar(-1);

      await sleep(speed * 0.7);

      if (getStopSorting()) {
        cleanup();
        return;
      }

      /* Actual swap */
      [arr[i], arr[minIndex]] = [
        arr[minIndex],
        arr[i],
      ];

      swaps++;
      setSwaps(swaps);

      setArray([...arr]);

      /*
       * Give Framer Motion time
       * to animate the new positions.
       */
      await sleep(Math.max(50, speed * 0.6));

      setSwappingBars([]);

      await sleep(speed * 0.25);
    } else {
      /* No swap required */
      setMinBar(-1);
    }

    /* -------------------------
       Mark position sorted
    ------------------------- */

    setSortedBars((prev) => [
      ...prev,
      i,
    ]);

    setProgress(
      Math.round(
        ((i + 1) / arr.length) * 100
      )
    );

    await sleep(speed * 0.25);
  }

  /* =========================
     FINISHED
  ========================= */

  const end = performance.now();

  setElapsedTime(
    Math.round(end - start)
  );

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, i) => i
    )
  );

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);
  setMinBar(-1);

  setProgress(100);

  setIsSorting(false);
}