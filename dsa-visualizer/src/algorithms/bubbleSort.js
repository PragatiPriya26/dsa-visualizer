export async function bubbleSort(array, setArray) {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Update UI
        setArray([...arr]);

        // Animation delay
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    }
  }
}