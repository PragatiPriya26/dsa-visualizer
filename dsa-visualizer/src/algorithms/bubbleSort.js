export async function bubbleSort(
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
  let swaps = 0;

  const start = performance.now();

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function waitIfPaused() {
    while (getIsPaused()) {
      if (getStopSorting()) {
        return false;
      }

      await sleep(100);
    }

    return true;
  }

  function stopSortingCleanup() {
    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setCurrentLine(0);
    setProgress(0);
    setSortingFinished(false);
    setIsSorting(false);
  }

  setIsSorting(true);

  setComparisons(0);
  setSwaps(0);
  setElapsedTime(0);
  setProgress(0);
  setSortingFinished(false);

  setSortedBars([]);
  setActiveBars([]);
  setSwappingBars([]);

  for (let i = 0; i < arr.length; i++) {

    if (getStopSorting()) {
      stopSortingCleanup();
      return;
    }

    const resume = await waitIfPaused();

    if (!resume) {
      stopSortingCleanup();
      return;
    }

    setCurrentLine(1);

    for (let j = 0; j < arr.length - i - 1; j++) {

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      const resume = await waitIfPaused();

      if (!resume) {
        stopSortingCleanup();
        return;
      }

      setCurrentLine(2);

      setActiveBars([j, j + 1]);
      setSwappingBars([]);

      await sleep(speed);

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      comparisons++;
      setComparisons(comparisons);

      setCurrentLine(3);

      if (arr[j].value > arr[j + 1].value) {

  // Highlight the two bars
  setSwappingBars([j, j + 1]);

  // Lift them
  await sleep(speed * 0.8);

  // Swap in the array
  [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

  swaps++;
  setSwaps(swaps);

  // Update the UI
  setArray([...arr]);

  // Allow Framer Motion to animate the movement
  await sleep(speed * 1.2);

  // Remove swap highlight
  setSwappingBars([]);
}

// Clear comparison highlight after every comparison
setActiveBars([]);}
    setSortedBars((prev) => [...prev, arr.length - i - 1]);

    setProgress(
      Math.round(((i + 1) / arr.length) * 100)
    );
  }

  const end = performance.now();

  setElapsedTime(Math.round(end - start));

  setCurrentLine(0);
  setActiveBars([]);
  setSwappingBars([]);
  setProgress(100);

  setSortedBars(
    Array.from({ length: arr.length }, (_, i) => i)
  );

  setSortingFinished(true);

  setIsSorting(false);
}