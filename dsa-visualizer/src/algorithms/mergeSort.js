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
    setSortedBars([]);
    setMergeRange(null);

    setCurrentLine(0);
    setProgress(0);

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

    // ==================================================
    // 🟣 ONLY THIS RANGE IS PURPLE
    //
    // Example:
    //
    // [2, 5, 8] [1, 4, 9]
    //  ^^^^^^^^^^^^^^^^^
    //  currently merging
    // ==================================================

    setMergeRange({
      left,
      right,
    });

    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    // ==================================================
    // MERGE TWO SORTED HALVES
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

      // ==================================================
      // 🔴 COMPARISON
      // ==================================================

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
      // CHOOSE SMALLER ELEMENT
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
      // 🟠 WRITE TO ARRAY
      // ==================================================

      setCurrentLine(6);

      setActiveBars([]);

      setSwappingBars([k]);

      arr[k] = selected;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      await sleep(speed);

      if (getStopSorting()) {
        return false;
      }

      setSwappingBars([]);

      k++;

      // ==================================================
      // PROGRESS
      // ==================================================

      setProgress(
        Math.round(
          (k / arr.length) * 100
        )
      );
    }

    // ==================================================
    // REMAINING LEFT ELEMENTS
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

      if (getStopSorting()) {
        return false;
      }

      setSwappingBars([]);

      setProgress(
        Math.round(
          (k / arr.length) * 100
        )
      );
    }

    // ==================================================
    // REMAINING RIGHT ELEMENTS
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

      if (getStopSorting()) {
        return false;
      }

      setSwappingBars([]);

      setProgress(
        Math.round(
          (k / arr.length) * 100
        )
      );
    }

    // ==================================================
    // MERGE FINISHED
    // ==================================================

    setActiveBars([]);
    setSwappingBars([]);

    // Keep the merged section violet briefly
    await sleep(
      Math.max(80, speed * 0.5)
    );

    // Remove purple
    setMergeRange(null);

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

    // ==================================================
    // SORT LEFT HALF
    // ==================================================

    setCurrentLine(2);

    const leftDone =
      await sort(left, mid);

    if (!leftDone) {
      return false;
    }

    if (getStopSorting()) {
      return false;
    }

    // ==================================================
    // SORT RIGHT HALF
    // ==================================================

    setCurrentLine(3);

    const rightDone =
      await sort(mid + 1, right);

    if (!rightDone) {
      return false;
    }

    if (getStopSorting()) {
      return false;
    }

    // ==================================================
    // MERGE
    //
    // IMPORTANT:
    // Purple is NOT set here.
    //
    // merge() itself sets the exact range.
    // ==================================================

    setCurrentLine(4);

    const merged =
      await merge(
        left,
        mid,
        right
      );

    if (!merged) {
      return false;
    }

    if (getStopSorting()) {
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
  // RUN
  // ==================================================

  const completed =
    await sort(
      0,
      arr.length - 1
    );

  // ==================================================
  // STOPPED / RESET
  // ==================================================

  if (
    !completed ||
    getStopSorting()
  ) {
    cleanup();
    return;
  }

  // ==================================================
  // COMPLETED
  // ==================================================

  setArray([...arr]);

  setActiveBars([]);
  setSwappingBars([]);

  // Remove purple
  setMergeRange(null);

  // ==================================================
  // 🟢 EVERYTHING SORTED
  // ==================================================

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