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

      // IMPORTANT:
      // Do not clear any visual state while paused.
      // Purple / red / orange remains frozen.
      await sleep(50);
    }

    if (getStopSorting()) {
      return false;
    }

    return true;
  }

  // ==================================================
  // PAUSE-SAFE SLEEP
  // ==================================================

  async function pauseSafeSleep(ms) {
    const interval = 25;
    let elapsed = 0;

    while (elapsed < ms) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      const remaining = ms - elapsed;
      const delay = Math.min(interval, remaining);

      await sleep(delay);
      elapsed += delay;
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
    // --------------------------------------------------
    // STOP / PAUSE
    // --------------------------------------------------

    if (getStopSorting()) {
      return false;
    }

    if (!(await waitIfPaused())) {
      return false;
    }

    // ==================================================
    // 🟣 SHOW MERGE RANGE
    // ==================================================

    setMergeRange({
      left,
      right,
    });

    setActiveBars([]);
    setSwappingBars([]);

    setCurrentLine(4);

    // Keep purple range visible
    if (
      !(await pauseSafeSleep(
        Math.max(100, speed)
      ))
    ) {
      return false;
    }

    // ==================================================
    // CREATE TEMPORARY HALVES
    // ==================================================

    const leftPart = arr.slice(
      left,
      mid + 1
    );

    const rightPart = arr.slice(
      mid + 1,
      right + 1
    );

    let i = 0;
    let j = 0;
    let k = left;

    // ==================================================
    // MERGE TWO HALVES
    // ==================================================

    while (
      i < leftPart.length &&
      j < rightPart.length
    ) {
      // ------------------------------------------------
      // STOP / PAUSE
      // ------------------------------------------------

      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      // ------------------------------------------------
      // CURRENT INDICES
      // ------------------------------------------------

      const leftIndex = left + i;
      const rightIndex =
        mid + 1 + j;

      // ==================================================
      // 🟣 PURPLE RANGE
      // 🔴 RED COMPARISON
      // ==================================================

      setMergeRange({
        left,
        right,
      });

      setCurrentLine(5);

      setActiveBars([
        leftIndex,
        rightIndex,
      ]);

      setSwappingBars([]);

      comparisons++;
      setComparisons(comparisons);

      if (
        !(await pauseSafeSleep(speed))
      ) {
        return false;
      }

      // ------------------------------------------------
      // STOP CHECK
      // ------------------------------------------------

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
      // 🟠 WRITE
      // ==================================================

      setCurrentLine(6);

      setActiveBars([]);

      setSwappingBars([k]);

      // Keep purple range visible
      setMergeRange({
        left,
        right,
      });

      arr[k] = selected;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      if (
        !(await pauseSafeSleep(
          Math.max(50, speed * 0.8)
        ))
      ) {
        return false;
      }

      setSwappingBars([]);

      k++;

      // ==================================================
      // PROGRESS
      // ==================================================

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

    while (
      i < leftPart.length
    ) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      setCurrentLine(7);

      setActiveBars([]);
      setSwappingBars([k]);

      // Purple range remains visible
      setMergeRange({
        left,
        right,
      });

      arr[k] = leftPart[i];

      i++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      if (
        !(await pauseSafeSleep(
          Math.max(50, speed * 0.8)
        ))
      ) {
        return false;
      }

      setSwappingBars([]);

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
    // REMAINING RIGHT
    // ==================================================

    while (
      j < rightPart.length
    ) {
      if (getStopSorting()) {
        return false;
      }

      if (!(await waitIfPaused())) {
        return false;
      }

      setCurrentLine(8);

      setActiveBars([]);
      setSwappingBars([k]);

      // Purple range remains visible
      setMergeRange({
        left,
        right,
      });

      arr[k] = rightPart[j];

      j++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      if (
        !(await pauseSafeSleep(
          Math.max(50, speed * 0.8)
        ))
      ) {
        return false;
      }

      setSwappingBars([]);

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
    // 🟣 MERGE COMPLETE
    // ==================================================

    setActiveBars([]);
    setSwappingBars([]);

    setMergeRange({
      left,
      right,
    });

    // Show completed merge section
    if (
      !(await pauseSafeSleep(
        Math.max(120, speed)
      ))
    ) {
      return false;
    }

    // Clear merge range
    setMergeRange(null);

    return true;
  }

  // ==================================================
  // RECURSIVE MERGE SORT
  // ==================================================

  async function sort(left, right) {
    // --------------------------------------------------
    // STOP / PAUSE
    // --------------------------------------------------

    if (getStopSorting()) {
      return false;
    }

    if (!(await waitIfPaused())) {
      return false;
    }

    // --------------------------------------------------
    // SINGLE ELEMENT
    // --------------------------------------------------

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
    // 🟣 SHOW CURRENT RANGE
    // ==================================================

    setMergeRange({
      left,
      right,
    });

    setActiveBars([]);
    setSwappingBars([]);

    if (
      !(await pauseSafeSleep(
        Math.max(80, speed)
      ))
    ) {
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
      await sort(
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
  // FINAL ARRAY
  // ==================================================

  setArray([...arr]);

  setActiveBars([]);
  setSwappingBars([]);

  setMergeRange(null);

  // ==================================================
  // 🟢 EVERYTHING SORTED
  // ==================================================

  setSortedBars(
    Array.from(
      {
        length: arr.length,
      },
      (_, i) => i
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