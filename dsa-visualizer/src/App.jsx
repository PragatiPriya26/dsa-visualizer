import { useState, useEffect, useRef } from "react";

import Navbar from "./components/Navbar";
import AlgorithmTabs from "./components/AlgorithmTabs";
import Controls from "./components/Controls";
import SortingVisualizer from "./components/SortingVisualizer";
import Sidebar from "./components/Sidebar";
import TracePanel from "./components/TracePanel";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";

function App() {
  // ==================================================
  // ARRAY
  // ==================================================

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(80);
  const [arrayType, setArrayType] = useState("random");

  // ==================================================
  // VISUALIZATION
  // ==================================================

  const [activeBars, setActiveBars] = useState([]);
  const [swappingBars, setSwappingBars] = useState([]);
  const [minBar, setMinBar] = useState(-1);
  const [sortedBars, setSortedBars] = useState([]);

  // ==================================================
  // MERGE SORT VISUALIZATION
  // ==================================================

  const [mergeRange, setMergeRange] = useState(null);

  // ==================================================
  // SORTING STATE
  // ==================================================

  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sortingFinished, setSortingFinished] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("bubble");

  // ==================================================
  // STATISTICS
  // ==================================================

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  // ==================================================
  // REFS
  // ==================================================

  const isPausedRef = useRef(false);
  const stopSortingRef = useRef(false);

  // Prevent two algorithms from running together
  const sortingRunningRef = useRef(false);

  // Promise of currently running algorithm
  const sortingPromiseRef = useRef(null);
// ==================================================
// LIVE TIMER REFS
// ==================================================

const timerRef = useRef(null);
const timerStartRef = useRef(0);
const pausedTimeRef = useRef(0);
const pauseStartRef = useRef(null);
  // ==================================================
  // SWAP ANIMATION
  // ==================================================

  const [swapAnimation, setSwapAnimation] = useState({
    leftId: null,
    rightId: null,
  });

  // ==================================================
  // GENERATE ARRAY
  // ==================================================

  function generateArray() {
    let newArray = [];

    // ----------------------------------------------
    // RANDOM
    // ----------------------------------------------

    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        id: crypto.randomUUID(),
        value: Math.floor(Math.random() * 300) + 20,
      });
    }

    // ----------------------------------------------
    // NEARLY SORTED
    // ----------------------------------------------

    if (arrayType === "nearly") {
      newArray.sort((a, b) => a.value - b.value);

      const shuffleCount = Math.min(5, arraySize);

      for (let i = 0; i < shuffleCount; i++) {
        const a = Math.floor(Math.random() * arraySize);
        const b = Math.floor(Math.random() * arraySize);

        [newArray[a], newArray[b]] = [
          newArray[b],
          newArray[a],
        ];
      }
    }

    // ----------------------------------------------
    // REVERSED
    // ----------------------------------------------

    if (arrayType === "reversed") {
      newArray.sort((a, b) => b.value - a.value);
    }

    // ----------------------------------------------
    // FEW UNIQUE
    // ----------------------------------------------

    if (arrayType === "few") {
      newArray = [];

      const values = [40, 80, 120, 160, 200];

      for (let i = 0; i < arraySize; i++) {
        newArray.push({
          id: crypto.randomUUID(),
          value:
            values[
              Math.floor(
                Math.random() * values.length
              )
            ],
        });
      }
    }

    // ----------------------------------------------
    // UPDATE ARRAY
    // ----------------------------------------------

    setArray(newArray);

    // ----------------------------------------------
    // CLEAR VISUALIZATION
    // ----------------------------------------------

    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setMinBar(-1);
    setMergeRange(null);

    setSwapAnimation({
      leftId: null,
      rightId: null,
    });

    // ----------------------------------------------
    // RESET STATISTICS
    // ----------------------------------------------

    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setCurrentLine(0);
    setProgress(0);

    setSortingFinished(false);
    setIsPaused(false);

    isPausedRef.current = false;
  }

  // ==================================================
  // INITIAL ARRAY / SETTINGS CHANGE
  // ==================================================

  useEffect(() => {
    if (!sortingRunningRef.current) {
      generateArray();
    }
  }, [arraySize, arrayType]);

  // ==================================================
  // PAUSE / RESUME
  // ==================================================

  const togglePause = () => {
    if (!sortingRunningRef.current) {
      return;
    }

    const nextPaused = !isPaused;

    isPausedRef.current = nextPaused;
    setIsPaused(nextPaused);
  };

  // ==================================================
  // START SORTING
  // ==================================================

  const startSorting = async () => {
    // ----------------------------------------------
    // Don't start another algorithm
    // ----------------------------------------------

    if (sortingRunningRef.current) {
      return;
    }

    if (!array || array.length === 0) {
      generateArray();
      return;
    }

    // ----------------------------------------------
    // START SESSION
    // ----------------------------------------------

    sortingRunningRef.current = true;

    stopSortingRef.current = false;
    isPausedRef.current = false;

    setIsPaused(false);
    setSortingFinished(false);

    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setMinBar(-1);
    setMergeRange(null);

    setSwapAnimation({
      leftId: null,
      rightId: null,
    });

    // ----------------------------------------------
    // RUN SELECTED ALGORITHM
    // ----------------------------------------------

    const sortingPromise = (async () => {
      try {
        switch (selectedAlgorithm) {
          // ========================================
          // BUBBLE SORT
          // ========================================

          case "bubble":
            await bubbleSort(
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
              () => isPausedRef.current,
              () => stopSortingRef.current,
              setSortingFinished,
              setSwapAnimation
            );
            break;

          // ========================================
// SELECTION SORT
// ========================================

case "selection":
  await selectionSort(
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
    () => isPausedRef.current,
    () => stopSortingRef.current
  );
  break;

          // ========================================
          // INSERTION SORT
          // ========================================

          case "insertion":
            await insertionSort(
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
              () => isPausedRef.current,
              () => stopSortingRef.current,
              setSortingFinished
            );
            break;

          // ========================================
          // MERGE SORT
          // ========================================

          case "merge":
            await mergeSort(
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
              () => isPausedRef.current,
              () => stopSortingRef.current,
              setSortingFinished,
              setMergeRange
            );
            break;

          default:
            console.error(
              "Unknown algorithm:",
              selectedAlgorithm
            );
        }
      } catch (error) {
        console.error(
          "Sorting error:",
          error
        );

        setIsSorting(false);
        setIsPaused(false);

        setActiveBars([]);
        setSwappingBars([]);
        setMinBar(-1);
        setMergeRange(null);

        setSwapAnimation({
          leftId: null,
          rightId: null,
        });
      }
    })();

    // Store currently running promise
    sortingPromiseRef.current = sortingPromise;

    // Wait until algorithm finishes
    await sortingPromise;

    // ----------------------------------------------
    // SORTING SESSION FINISHED
    // ----------------------------------------------

    if (!stopSortingRef.current) {
      setIsSorting(false);
    }

    sortingRunningRef.current = false;
    sortingPromiseRef.current = null;
  };

  // ==================================================
  // RESET
  // ==================================================

  const resetSorting = async () => {
    // ----------------------------------------------
    // Tell algorithm to stop
    // ----------------------------------------------

    stopSortingRef.current = true;

    // Release pause
    isPausedRef.current = false;

    setIsPaused(false);

    // ----------------------------------------------
    // Clear UI immediately
    // ----------------------------------------------

    setActiveBars([]);
    setSwappingBars([]);
    setSortedBars([]);
    setMinBar(-1);
    setMergeRange(null);

    setSwapAnimation({
      leftId: null,
      rightId: null,
    });

    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setCurrentLine(0);
    setProgress(0);

    setSortingFinished(false);

    // ----------------------------------------------
    // Wait for old algorithm
    // ----------------------------------------------

    if (sortingPromiseRef.current) {
      try {
        await sortingPromiseRef.current;
      } catch (error) {
        console.error(
          "Reset error:",
          error
        );
      }
    }

    // ----------------------------------------------
    // New session
    // ----------------------------------------------

    sortingRunningRef.current = false;

    setIsSorting(false);

    // Allow new sorting session
    stopSortingRef.current = false;
    isPausedRef.current = false;

    // Generate fresh array
    generateArray();
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="grid-bg min-h-screen">

      <Navbar />

      <div className="max-w-[1700px] mx-auto px-5 py-3">

        {/* ============================================
            ALGORITHM TABS
        ============================================ */}

        <AlgorithmTabs
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={
            setSelectedAlgorithm
          }
        />

        {/* ============================================
            CONTROLS
        ============================================ */}

        <div className="mt-3">
          <Controls
            generateArray={generateArray}
            startSorting={startSorting}

            selectedAlgorithm={
              selectedAlgorithm
            }

            setSelectedAlgorithm={
              setSelectedAlgorithm
            }

            arraySize={arraySize}
            setArraySize={setArraySize}

            speed={speed}
            setSpeed={setSpeed}

            arrayType={arrayType}
            setArrayType={setArrayType}

            isSorting={isSorting}

            isPaused={isPaused}
            togglePause={togglePause}

            resetSorting={resetSorting}
          />
        </div>

        {/* ============================================
            SORTING COMPLETED
        ============================================ */}

        {sortingFinished && (
          <div className="mt-4 rounded-2xl border border-emerald-500 bg-emerald-500/10 p-5 text-center shadow-lg">

            <h2 className="text-2xl font-bold text-emerald-400">
              🎉 Sorting Completed!
            </h2>

            <p className="mt-2 text-slate-300">
              {selectedAlgorithm
                .charAt(0)
                .toUpperCase() +
                selectedAlgorithm.slice(1)}{" "}
              Sort finished successfully.
            </p>

          </div>
        )}

        {/* ============================================
            MAIN LAYOUT
        ============================================ */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

          {/* ==========================================
              VISUALIZER
          ========================================== */}

          <div className="lg:col-span-2">

            <SortingVisualizer
              array={array}
              activeBars={activeBars}
              swappingBars={swappingBars}
              sortedBars={sortedBars}
              minBar={minBar}
              selectedAlgorithm={
                selectedAlgorithm
              }
              isSorting={isSorting}
              isPaused={isPaused}
              sortingFinished={
                sortingFinished
              }
              swapAnimation={
                swapAnimation
              }
              mergeRange={mergeRange}
            />

            {/* TRACE PANEL */}

            <div className="mt-3">
              <TracePanel
                algorithm={
                  selectedAlgorithm
                }
                currentLine={
                  currentLine
                }
              />
            </div>

          </div>

          {/* ==========================================
              SIDEBAR
          ========================================== */}

          <Sidebar
            selectedAlgorithm={
              selectedAlgorithm
            }
            comparisons={comparisons}
            swaps={swaps}
            elapsedTime={elapsedTime}
            sortedCount={
              sortedBars.length
            }
            totalBars={array.length}
            progress={progress}
          />

        </div>

      </div>

    </div>
  );
}

export default App;