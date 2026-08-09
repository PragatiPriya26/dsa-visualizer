

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
  setSortingFinished
) {
  const arr = [...array];

  let comparisons = 0;
  let writes = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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

  function cleanup() {
    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setCurrentLine(0);
    setProgress(0);
    setSortingFinished(false);
    setIsSorting(false);
  }

  async function merge(left, mid, right) {
    if (getStopSorting()) return false;

    if (!(await waitIfPaused())) {
      return false;
    }

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (getStopSorting()) return false;

      if (!(await waitIfPaused())) {
        return false;
      }

      setCurrentLine(5);

      setActiveBars([
        left + i,
        mid + 1 + j,
      ]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);

      if (getStopSorting()) return false;

      setCurrentLine(6);

      if (leftArr[i].value <= rightArr[j].value) {
        setCurrentLine(7);

        arr[k] = leftArr[i];
        i++;
      } else {
        setCurrentLine(7);

        arr[k] = rightArr[j];
        j++;
      }

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      setSwappingBars([k]);

      await sleep(speed);

      if (getStopSorting()) return false;

      setSwappingBars([]);

      k++;
    }

    setCurrentLine(8);

    while (i < leftArr.length) {
      if (getStopSorting()) return false;

      if (!(await waitIfPaused())) {
        return false;
      }

      arr[k] = leftArr[i];

      i++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      setSwappingBars([k - 1]);

      await sleep(speed);

      setSwappingBars([]);
    }

    while (j < rightArr.length) {
      if (getStopSorting()) return false;

      if (!(await waitIfPaused())) {
        return false;
      }

      arr[k] = rightArr[j];

      j++;
      k++;

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      setSwappingBars([k - 1]);

      await sleep(speed);

      setSwappingBars([]);
    }

    return true;
  }

  async function sort(left, right) {
    if (getStopSorting()) {
      return false;
    }

    if (!(await waitIfPaused())) {
      return false;
    }

    if (left >= right) {
      return true;
    }

    setCurrentLine(1);

    const mid = Math.floor((left + right) / 2);

    setCurrentLine(2);

    // Sort left half
    const leftFinished = await sort(left, mid);

    if (!leftFinished) {
      return false;
    }

    if (getStopSorting()) {
      return false;
    }

    setCurrentLine(3);

    // Sort right half
    const rightFinished = await sort(mid + 1, right);

    if (!rightFinished) {
      return false;
    }

    if (getStopSorting()) {
      return false;
    }

    setCurrentLine(4);

    // Merge
    const merged = await merge(left, mid, right);

    if (!merged) {
      return false;
    }

    if (getStopSorting()) {
      return false;
    }

    setCurrentLine(5);

    setProgress(
      Math.round(((right + 1) / arr.length) * 100)
    );

    return true;
  }

  // Start
  setIsSorting(true);
  setSortingFinished(false);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setSortedBars([]);

  const completed = await sort(
    0,
    arr.length - 1
  );

  // Reset/Stop happened
  if (!completed || getStopSorting()) {
    cleanup();
    return;
  }

  // Sorting successfully completed
  setArray([...arr]);

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, i) => i
    )
  );

  setProgress(100);

  setElapsedTime(
    Math.round(performance.now() - start)
  );

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);

  setSortingFinished(true);
  setIsSorting(false);
}