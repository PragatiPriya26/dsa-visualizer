export async function mergeSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSwappingBars,
  setSortedBars,
  setIsSorting,
  setComparisons,
  setSwaps,
  setElapsedTime,
  setCurrentLine,
  setProgress,
  getIsPaused,
  getStopSorting,
  setSortingFinished,
  setMergeRange
) {
  const arr = [...array];

  let comparisons = 0;
  let writes = 0;

  const start = performance.now();

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
    setSortedBars([]);
    setCurrentLine(0);
    setProgress(0);
    setMergeRange(null);
    setSortingFinished(false);
    setIsSorting(false);
  }

  // ==================================================
  // MERGE
  // ==================================================

  async function merge(left, mid, right) {
    if (getStopSorting()) {
      return false;
    }

    if (!(await waitIfPaused())) {
      return false;
    }

    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    // Show the current section being merged
    setMergeRange({
      start: left,
      end: right,
    });

    // ==================================================
    // COMPARE BOTH HALVES
    // ==================================================

    while (
      i < leftPart.length &&
      j < rightPart.length
    ) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;

      // 🔴 Comparing
      setCurrentLine(5);

      setActiveBars([
        leftIndex,
        rightIndex,
      ]);

      setSwappingBars([]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) {
        return false;
      }

      // ==================================================
      // CHOOSE SMALLER
      // ==================================================

      let selected;

      if (
        leftPart[i].value <=
        rightPart[j].value
      ) {
        selected = leftPart[i];
        i++;
      } else {
        selected = rightPart[j];
        j++;
      }

      // ==================================================
      // WRITE
      // ==================================================

      setCurrentLine(6);

      setActiveBars([]);

      // 🟠 Position being written
      setSwappingBars([k]);

      arr[k] = selected;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);

      k++;

      setProgress(
        Math.min(
          99,
          Math.round(
            (k / arr.length) * 100
          )
        )
      );
    }

    // ==================================================
    // REMAINING LEFT
    // ==================================================

    while (i < leftPart.length) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      setCurrentLine(7);

      setActiveBars([]);

      setSwappingBars([k]);

      arr[k] = leftPart[i];

      i++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);
    }

    // ==================================================
    // REMAINING RIGHT
    // ==================================================

    while (j < rightPart.length) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      setCurrentLine(8);

      setActiveBars([]);

      setSwappingBars([k]);

      arr[k] = rightPart[j];

      j++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      await sleep(speed);

      setSwappingBars([]);
    }

    // ==================================================
    // SECTION MERGED
    // ==================================================

    setActiveBars([]);

    setSwappingBars([]);

    // Keep merged section highlighted briefly
    await sleep(Math.max(100, speed / 2));

    return true;
  }

  // ==================================================
  // RECURSIVE MERGE SORT
  // ==================================================

  async function sort(left, right) {
    if (getStopSorting()) {
      return false;
    }

    if (!(await waitIfPaused())) {
      return false;
    }

    // One element
    if (left >= right) {
      return true;
    }

    // ==================================================
    // DIVIDE
    // ==================================================

    setCurrentLine(1);

    const mid = Math.floor(
      (left + right) / 2
    );

    setMergeRange({
      start: left,
      end: right,
    });

    await sleep(Math.max(100, speed / 2));

    // ==================================================
    // LEFT HALF
    // ==================================================

    setCurrentLine(2);

    const leftDone = await sort(
      left,
      mid
    );

    if (!leftDone) {
      return false;
    }

    // ==================================================
    // RIGHT HALF
    // ==================================================

    setCurrentLine(3);

    const rightDone = await sort(
      mid + 1,
      right
    );

    if (!rightDone) {
      return false;
    }

    // ==================================================
    // MERGE
    // ==================================================

    setCurrentLine(4);

    const merged = await merge(
      left,
      mid,
      right
    );

    if (!merged) {
      return false;
    }

    return true;
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
  setSortedBars([]);
  setMergeRange(null);

  // ==================================================
  // RUN MERGE SORT
  // ==================================================

  const completed = await sort(
    0,
    arr.length - 1
  );

  // ==================================================
  // STOPPED
  // ==================================================

  if (
    !completed ||
    getStopSorting()
  ) {
    cleanup();
    return;
  }

  // ==================================================
  // FINAL RESULT
  // ==================================================

  setArray([...arr]);

  setActiveBars([]);
  setSwappingBars([]);
  setMergeRange(null);

  // 🟢 Everything is finally sorted
  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, i) => i
    )
  );

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