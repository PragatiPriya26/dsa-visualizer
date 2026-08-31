# DSA Visualizer

An interactive web-based Data Structures & Algorithms visualizer built with React, Vite, Tailwind CSS, and Framer Motion.

The project provides animated visualizations of popular sorting algorithms along with real-time statistics, algorithm tracing, complexity information, and interactive controls.

## 🚀 Features

- Visualize sorting algorithms with animated bars
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Play / Pause / Resume sorting
- Reset sorting
- Adjustable array size
- Adjustable sorting speed
- Multiple array patterns:
  - Random
  - Nearly Sorted
  - Reversed
  - Few Unique
- Real-time comparisons counter
- Real-time swaps/writes counter
- Execution time
- Sorting progress
- Algorithm trace panel
- Time and space complexity information
- Color-coded visualization
- Smooth Framer Motion animations
- Responsive UI

## 🎨 Visualization Colors

| Color | Meaning |
|---|---|
| 🟦 Cyan | Normal element |
| 🔴 Red | Comparing elements |
| 🟠 Orange | Swapping / Writing |
| 🟣 Purple | Current key / Merge range |
| 🟢 Green | Sorted element |

## 🧮 Algorithms

### Bubble Sort

Repeatedly compares adjacent elements and swaps them if they are in the wrong order.

- Best: O(n)
- Average: O(n²)
- Worst: O(n²)
- Space: O(1)
- Stable: Yes

### Selection Sort

Finds the minimum element from the unsorted portion and places it at the beginning.

- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)
- Space: O(1)
- Stable: No

### Insertion Sort

Builds the sorted portion one element at a time by shifting larger elements.

- Best: O(n)
- Average: O(n²)
- Worst: O(n²)
- Space: O(1)
- Stable: Yes

### Merge Sort

Divides the array into smaller portions, recursively sorts them, and merges the sorted portions.

- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)
- Space: O(n)
- Stable: Yes

## 🛠️ Technologies Used

- React
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion

## 📂 Project Structure

```text
src/
├── algorithms/
│   ├── bubbleSort.js
│   ├── selectionSort.js
│   ├── insertionSort.js
│   └── mergeSort.js
│
├── components/
│   ├── Navbar.jsx
│   ├── AlgorithmTabs.jsx
│   ├── Controls.jsx
│   ├── ArrayBars.jsx
│   ├── SortingVisualizer.jsx
│   ├── Sidebar.jsx
│   ├── ComplexityCard.jsx
│   ├── StatCard.jsx
│   └── TracePanel.jsx
│
├── App.jsx
└── main.jsx