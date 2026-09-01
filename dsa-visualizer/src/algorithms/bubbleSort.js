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
  setSortingFinished,
  setSwapAnimation
) {
  const arr = [...array];

  let comparisons = 0;
  let swaps = 0;

  const start = performance.now();

  // ==================================================
  // BASIC SLEEP
  // ==================================================

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // ==================================================
  // STOP CHECK
  // ==================================================

  function shouldStop() {
    return getStopSorting();
  }

  // ==================================================
  // WAIT WHILE PAUSED
  //
  // IMPORTANT:
  // Nothing visual is changed here.
  // Whatever colour is currently visible stays visible.
  // ==================================================

  async function waitIfPaused() {
    while (getIsPaused()) {
      if (shouldStop()) {
        return false;
      }

      await sleep(40);
    }

    if (shouldStop()) {
      return false;
    }

    return true;
  }

  // ==================================================
  // PAUSE-SAFE DELAY
  //
  // The elapsed animation time stops while paused.
  // ==================================================

  async function pauseSafeSleep(duration) {
    let elapsed = 0;

    while (elapsed < duration) {
      // STOP
      if (shouldStop()) {
        return false;
      }

      // PAUSE
      if (getIsPaused()) {
        if (!(await waitIfPaused())) {
          return false;
        }

        // Do NOT consume animation time while paused
        continue;
      }

      const step = Math.min(20, duration - elapsed);

      await sleep(step);

      // If pause happened during the sleep,
      // don't count that time.
      if (getIsPaused()) {
        continue;
      }

      elapsed += step;
    }

    return !shouldStop();
  }

  // ==================================================
  // CLEANUP
  // ==================================================

  function stopSortingCleanup() {
    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);

    setCurrentLine(0);
    setProgress(0);

    setSortingFinished(false);
    setIsSorting(false);

    setSwapAnimation({
      leftId: null,
      rightId: null,
    });
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
  setSortedBars([]);

  setSwapAnimation({
    leftId: null,
    rightId: null,
  });

  // ==================================================
  // BUBBLE SORT
  // ==================================================

  for (let i = 0; i < arr.length; i++) {

    // ==================================================
    // STOP
    // ==================================================

    if (shouldStop()) {
      stopSortingCleanup();
      return;
    }

    // ==================================================
    // PAUSE
    // ==================================================

    if (!(await waitIfPaused())) {
      stopSortingCleanup();
      return;
    }

    // ==================================================
    // TRACE LINE 1
    // ==================================================

    setCurrentLine(1);

    if (
      !(await pauseSafeSleep(
        Math.max(20, speed * 0.25)
      ))
    ) {
      stopSortingCleanup();
      return;
    }

    // ==================================================
    // INNER LOOP
    // ==================================================

    for (
      let j = 0;
      j < arr.length - i - 1;
      j++
    ) {

      // ==================================================
      // STOP
      // ==================================================

      if (shouldStop()) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // PAUSE
      // ==================================================

      if (!(await waitIfPaused())) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // TRACE LINE 2
      // ==================================================

      setCurrentLine(2);

      if (
        !(await pauseSafeSleep(
          Math.max(15, speed * 0.2)
        ))
      ) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // COMPARE
      // 🔴 RED
      // ==================================================

      setCurrentLine(3);

      setActiveBars([
        j,
        j + 1,
      ]);

      setSwappingBars([]);

      setSwapAnimation({
        leftId: null,
        rightId: null,
      });

      // --------------------------------------------------
      // RED REMAINS VISIBLE WHILE PAUSED
      // --------------------------------------------------

      if (
        !(await pauseSafeSleep(speed))
      ) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // COMPARISON COUNT
      // ==================================================

      comparisons++;

      setComparisons(comparisons);

      // ==================================================
      // TRACE LINE 4
      // ==================================================

      setCurrentLine(4);

      if (
        !(await pauseSafeSleep(
          Math.max(30, speed * 0.35)
        ))
      ) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // SWAP REQUIRED
      // ==================================================

      if (
        arr[j].value >
        arr[j + 1].value
      ) {

        // ==================================================
        // TRACE LINE 5
        // 🟠 ORANGE
        // ==================================================

        setCurrentLine(5);

        setActiveBars([]);

        setSwappingBars([
          j,
          j + 1,
        ]);

        setSwapAnimation({
          leftId: arr[j].id,
          rightId: arr[j + 1].id,
        });

        // --------------------------------------------------
        // ORANGE REMAINS VISIBLE WHILE PAUSED
        // --------------------------------------------------

        if (
          !(await pauseSafeSleep(
            Math.max(40, speed * 0.65)
          ))
        ) {
          stopSortingCleanup();
          return;
        }

        // ==================================================
        // ACTUAL SWAP
        // ==================================================

        [arr[j], arr[j + 1]] = [
          arr[j + 1],
          arr[j],
        ];

        swaps++;

        setSwaps(swaps);

        setArray([...arr]);

        // ==================================================
        // FINISH ANIMATION
        // ==================================================

        if (
          !(await pauseSafeSleep(
            Math.max(50, speed * 1.15)
          ))
        ) {
          stopSortingCleanup();
          return;
        }

        // ==================================================
        // CLEAR SWAP
        // ==================================================

        setSwapAnimation({
          leftId: null,
          rightId: null,
        });

        setSwappingBars([]);
      }

      // ==================================================
      // CLEAR COMPARISON
      //
      // This only happens AFTER Resume and operation
      // has finished.
      // ==================================================

      setActiveBars([]);
    }

    // ==================================================
    // TRACE LINE 6
    // MARK LARGEST ELEMENT AS SORTED
    // 🟢 GREEN
    // ==================================================

    setCurrentLine(6);

    const sortedIndex =
      arr.length - i - 1;

    setSortedBars((previous) => {
      if (
        previous.includes(sortedIndex)
      ) {
        return previous;
      }

      return [
        ...previous,
        sortedIndex,
      ];
    });

    // ==================================================
    // PROGRESS
    // ==================================================

    setProgress(
      Math.round(
        ((i + 1) / arr.length) * 100
      )
    );

    if (
      !(await pauseSafeSleep(
        Math.max(20, speed * 0.3)
      ))
    ) {
      stopSortingCleanup();
      return;
    }
  }

  // ==================================================
  // COMPLETE
  // ==================================================

  const end = performance.now();

  setArray([...arr]);

  setElapsedTime(
    Math.round(end - start)
  );

  setCurrentLine(0);

  setActiveBars([]);
  setSwappingBars([]);

  setSwapAnimation({
    leftId: null,
    rightId: null,
  });

  setProgress(100);

  // ==================================================
  // ALL GREEN
  // ==================================================

  setSortedBars(
    Array.from(
      { length: arr.length },
      (_, index) => index
    )
  );

  // ==================================================
  // FINISHED
  // ==================================================

  setSortingFinished(true);
  setIsSorting(false);
}