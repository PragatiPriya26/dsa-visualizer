export async function selectionSort(
  array,
  setArray,
  speed,
  setActiveBars,
  setSortedBars,
  setIsSorting
) {
  const arr = [...array];

  setIsSorting(true);
  setSortedBars([]);

  for (let i = 0; i < arr.length; i++) {

    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {

      setActiveBars([minIndex, j]);

      await new Promise(resolve =>
        setTimeout(resolve, speed)
      );

      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

    setArray([...arr]);

    setSortedBars(prev => [...prev, i]);

    await new Promise(resolve =>
      setTimeout(resolve, speed)
    );
  }

  setActiveBars([]);
  setIsSorting(false);
}