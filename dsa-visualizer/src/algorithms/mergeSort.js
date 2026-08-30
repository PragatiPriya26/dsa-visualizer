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
    // 🟣 SHOW CURRENT MERGE RANGE
    // ==================================================

    setMergeRange({
      left: left,
      right: right,
    });

    setActiveBars([]);
    setSwappingBars([]);

    await sleep(Math.max(100, speed));

    // ==================================================
    // CREATE TEMPORARY HALVES
    // ==================================================

    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    // ==================================================
    // MERGE
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
      // 🟣 KEEP RANGE VISIBLE
      // 🔴 SHOW ONLY TWO COMPARING ELEMENTS
      // ==================================================

      setMergeRange({
        left: left,
        right: right,
      });

      setCurrentLine(5);

      setActiveBars([
        leftIndex,
        rightIndex,
      ]);

      setSwappingBars([]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

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
      // 🟠 WRITE ELEMENT
      // ==================================================

      setCurrentLine(6);

      setActiveBars([]);

      setSwappingBars([k]);

      arr[k] = selected;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      await sleep(speed);

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

      setProgress(
        Math.round(
          (k / arr.length) * 100
        )
      );
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

      setProgress(
        Math.round(
          (k / arr.length) * 100
        )
      );
    }

    // ==================================================
    // 🟣 KEEP MERGE RANGE VISIBLE
    // ==================================================

    setActiveBars([]);
    setSwappingBars([]);

    setMergeRange({
      left: left,
      right: right,
    });

    await sleep(
      Math.max(150, speed)
    );

    // Clear range
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
    // 🟣 SHOW CURRENT SECTION
    // ==================================================

    setMergeRange({
      left: left,
      right: right,
    });

    setActiveBars([]);
    setSwappingBars([]);

    await sleep(
      Math.max(100, speed)
    );

    if (getStopSorting()) {
      return false;
    }

    // ==================================================
    // LEFT HALF
    // ==================================================

    setCurrentLine(2);

    const leftDone =
      await sort(left, mid);

    if (!leftDone) {
      return false;
    }

    // ==================================================
    // RIGHT HALF
    // ==================================================

    setCurrentLine(3);

    const rightDone =
      await sort(mid + 1, right);

    if (!rightDone) {
      return false;
    }

    // ==================================================
    // MERGE
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
  // COMPLETE
  // ==================================================

  setArray([...arr]);

  setActiveBars([]);
  setSwappingBars([]);

  // Remove purple merge range
  setMergeRange(null);

  // ==================================================
  // 🟢 EVERYTHING GREEN
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