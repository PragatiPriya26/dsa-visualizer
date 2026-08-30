function TracePanel({
  algorithm,
  currentLine,
}) {
  // ==================================================
  // TRACE CODE
  // ==================================================

  const traces = {
    bubble: [
      "for (i = 0; i < n; i++)",
      "  for (j = 0; j < n - i - 1; j++)",
      "    Compare array[j] and array[j + 1]",
      "    If array[j] > array[j + 1]",
      "      Swap the two elements",
      "    Mark largest element as sorted",
    ],

    selection: [
      "for (i = 0; i < n - 1; i++)",
      "  minIndex = i",
      "  for (j = i + 1; j < n; j++)",
      "    Compare array[j] with array[minIndex]",
      "    If array[j] < array[minIndex]",
      "      Update minIndex",
      "  Swap array[i] and array[minIndex]",
    ],

    insertion: [
      "for (i = 1; i < n; i++)",
      "  key = array[i]",
      "  Compare key with previous elements",
      "  While array[j] > key",
      "    Shift array[j] to the right",
      "  Insert key at correct position",
    ],

    merge: [
      "if (left >= right) return",
      "mid = floor((left + right) / 2)",
      "Sort the left half",
      "Sort the right half",
      "Merge the two sorted halves",
      "Compare elements from both halves",
      "Write the smaller element",
      "Copy remaining left elements",
      "Copy remaining right elements",
    ],
  };

  const code = traces[algorithm] || traces.bubble;

  // ==================================================
  // ALGORITHM NAME
  // ==================================================

  const algorithmNames = {
    bubble: "Bubble Sort",
    selection: "Selection Sort",
    insertion: "Insertion Sort",
    merge: "Merge Sort",
  };

  const algorithmName =
    algorithmNames[algorithm] || "Sorting Algorithm";

  // ==================================================
  // DESCRIPTION
  // ==================================================

  const descriptions = {
    bubble:
      "Repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

    selection:
      "Finds the minimum element from the unsorted portion and places it at the beginning.",

    insertion:
      "Builds the sorted portion one element at a time by shifting larger elements.",

    merge:
      "Divides the array into smaller halves, sorts them recursively, and merges them together.",
  };

  // ==================================================
  // CURRENT STEP
  // ==================================================

  const currentStep =
    currentLine >= 1 && currentLine <= code.length
      ? code[currentLine - 1]
      : "Ready to start";

  // ==================================================
  // ACTIVE LINE
  // ==================================================

  const activeIndex =
    currentLine >= 1 && currentLine <= code.length
      ? currentLine - 1
      : -1;

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="px-5 py-4 border-b border-slate-700">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-cyan-300">
              Algorithm Trace
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {algorithmName}
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">

            <span className="text-xs text-slate-400">
              Step {currentLine > 0 ? currentLine : "—"}
            </span>

          </div>

        </div>

      </div>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <div className="px-5 py-4 border-b border-slate-800">

        <p className="text-sm text-slate-400 leading-relaxed">
          {descriptions[algorithm] || descriptions.bubble}
        </p>

      </div>

      {/* ==================================================
          CODE
      ================================================== */}

      <div className="p-4">

        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">

          {code.map((line, index) => {

            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`
                  flex
                  items-center
                  min-h-[38px]
                  px-4
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-cyan-500/15 border-l-4 border-cyan-400"
                      : "border-l-4 border-transparent"
                  }
                `}
              >

                {/* LINE NUMBER */}

                <span
                  className={`
                    w-8
                    text-right
                    mr-4
                    text-xs
                    font-mono
                    select-none
                    ${
                      isActive
                        ? "text-cyan-300"
                        : "text-slate-600"
                    }
                  `}
                >
                  {index + 1}
                </span>

                {/* CODE */}

                <code
                  className={`
                    font-mono
                    text-sm
                    whitespace-pre
                    ${
                      isActive
                        ? "text-cyan-100 font-semibold"
                        : "text-slate-400"
                    }
                  `}
                >
                  {line}
                </code>

              </div>
            );
          })}

        </div>

      </div>

      {/* ==================================================
          CURRENT ACTION
      ================================================== */}

      <div className="px-5 pb-5">

        <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">

          <div className="flex items-start gap-3">

            {/* INDICATOR */}

            <div
              className={`
                mt-1
                w-3
                h-3
                rounded-full
                flex-shrink-0
                ${
                  currentLine === 0
                    ? "bg-green-400"
                    : "bg-cyan-400 animate-pulse"
                }
              `}
            />

            <div>

              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Current Action
              </p>

              <p className="text-sm text-slate-200 mt-1">
                {currentStep}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TracePanel;