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
      if (getStopSorting()) return false;
      await sleep(100);
    }
    return !getStopSorting();
  }

  async function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {

      if (getStopSorting()) return;

      if (!(await waitIfPaused())) return;

      setCurrentLine(5);

      setActiveBars([left + i, mid + 1 + j]);

      comparisons++;
      setComparisons(comparisons);

      await sleep(speed);
setCurrentLine(6);
      if (leftArr[i].value <= rightArr[j].value) {
        setCurrentLine(7);
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      writes++;
      setSwaps(writes);

      setArray([...arr]);

      setSwappingBars([k]);

      await sleep(speed);

      setSwappingBars([]);

      k++;
    }
setCurrentLine(8);
    while (i < leftArr.length) {
      if (getStopSorting()) return;

      arr[k++] = leftArr[i++];
      writes++;
      setSwaps(writes);
      setArray([...arr]);
      await sleep(speed);
    }

    while (j < rightArr.length) {
      if (getStopSorting()) return;

      arr[k++] = rightArr[j++];
      writes++;
      setSwaps(writes);
      setArray([...arr]);
      await sleep(speed);
    }
  }

  async function sort(left, right) {

    if (getStopSorting()) return;

    if (!(await waitIfPaused())) return;

    if (left >= right) return;

    setCurrentLine(1);

    const mid = Math.floor((left + right) / 2);

    setCurrentLine(2);

    await sort(left, mid);
    setCurrentLine(3);

    await sort(mid + 1, right);

    setCurrentLine(4);

    await merge(left, mid, right);
    setCurrentLine(5);

    setProgress(
      Math.round(((right + 1) / arr.length) * 100)
    );
  }

  setIsSorting(true);
  setSortingFinished(false);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);

  setActiveBars([]);
  setSwappingBars([]);
  setSortedBars([]);

  await sort(0, arr.length - 1);

  if (!getStopSorting()) {
    setSortedBars(
      Array.from({ length: arr.length }, (_, i) => i)
    );

    setProgress(100);

    setElapsedTime(
      Math.round(performance.now() - start)
    );

    setSortingFinished(true);
  }

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);

  setIsSorting(false);
}