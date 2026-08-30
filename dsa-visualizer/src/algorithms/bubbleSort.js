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

      // Keep all current colours visible while paused
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

  setSortedBars([]);
  setActiveBars([]);
  setSwappingBars([]);

  setSwapAnimation({
    leftId: null,
    rightId: null,
  });

  // ==================================================
  // BUBBLE SORT
  // ==================================================

  for (let i = 0; i < arr.length; i++) {

    // --------------------------------------------------
    // STOP
    // --------------------------------------------------

    if (getStopSorting()) {
      stopSortingCleanup();
      return;
    }

    // --------------------------------------------------
    // PAUSE
    // --------------------------------------------------

    if (!(await waitIfPaused())) {
      stopSortingCleanup();
      return;
    }

    // ==================================================
    // TRACE LINE 1
    // for (i = 0; i < n; i++)
    // ==================================================

    setCurrentLine(1);

    await sleep(Math.max(20, speed * 0.25));

    // ==================================================
    // INNER LOOP
    // ==================================================

    for (
      let j = 0;
      j < arr.length - i - 1;
      j++
    ) {

      // ------------------------------------------------
      // STOP
      // ------------------------------------------------

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      // ------------------------------------------------
      // PAUSE
      // ------------------------------------------------

      if (!(await waitIfPaused())) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // TRACE LINE 2
      // for (j = 0; ...)
      // ==================================================

      setCurrentLine(2);

      await sleep(
        Math.max(15, speed * 0.2)
      );

      // ==================================================
      // TRACE LINE 3
      // Compare array[j] and array[j + 1]
      //
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

      await sleep(speed);

      if (getStopSorting()) {
        stopSortingCleanup();
        return;
      }

      // ==================================================
      // COUNT COMPARISON
      // ==================================================

      comparisons++;

      setComparisons(comparisons);

      // ==================================================
      // TRACE LINE 4
      // If array[j] > array[j + 1]
      // ==================================================

      setCurrentLine(4);

      await sleep(
        Math.max(30, speed * 0.35)
      );

      if (getStopSorting()) {
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
        // Swap the two elements
        //
        // 🟠 ORANGE
        // ==================================================

        setCurrentLine(5);

        setActiveBars([]);

        setSwappingBars([
          j,
          j + 1,
        ]);

        // Stable ID based animation
        setSwapAnimation({
          leftId: arr[j].id,
          rightId: arr[j + 1].id,
        });

        // ------------------------------------------------
        // PAUSE SAFE
        // ------------------------------------------------

        if (!(await waitIfPaused())) {
          stopSortingCleanup();
          return;
        }

        await sleep(
          Math.max(40, speed * 0.65)
        );

        if (getStopSorting()) {
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

        // Update array
        setArray([
          ...arr,
        ]);

        // ------------------------------------------------
        // Let animation finish
        // ------------------------------------------------

        await sleep(
          Math.max(50, speed * 1.15)
        );

        if (getStopSorting()) {
          stopSortingCleanup();
          return;
        }

        // ------------------------------------------------
        // CLEAR SWAP
        // ------------------------------------------------

        setSwapAnimation({
          leftId: null,
          rightId: null,
        });

        setSwappingBars([]);
      }

      // ==================================================
      // CLEAR COMPARISON
      // ==================================================

      setActiveBars([]);
    }

    // ==================================================
    // TRACE LINE 6
    //
    // Mark largest element as sorted
    //
    // 🟢 GREEN
    // ==================================================

    setCurrentLine(6);

    const sortedIndex =
      arr.length - i - 1;

    setSortedBars((prev) => {

      if (
        prev.includes(sortedIndex)
      ) {
        return prev;
      }

      return [
        ...prev,
        sortedIndex,
      ];
    });

    // ==================================================
    // PROGRESS
    // ==================================================

    setProgress(
      Math.round(
        ((i + 1) /
          arr.length) *
          100
      )
    );

    await sleep(
      Math.max(20, speed * 0.3)
    );
  }

  // ==================================================
  // COMPLETE
  // ==================================================

  const end =
    performance.now();

  setArray([
    ...arr,
  ]);

  setElapsedTime(
    Math.round(
      end - start
    )
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
  // ALL BARS GREEN
  // ==================================================

  setSortedBars(
    Array.from(
      {
        length: arr.length,
      },
      (_, i) => i
    )
  );

  // ==================================================
  // FINISHED
  // ==================================================

  setSortingFinished(true);

  setIsSorting(false);
}