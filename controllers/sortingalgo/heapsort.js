const heapSortSteps = (arr) => {
  const steps = [];
  const a = [...arr];

  const heapify = (n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
      steps.push({
        arr: [...a],
        comparing: [i, left],
        swapped: false,
      });
      if (a[left] > a[largest]) largest = left;
    }

    if (right < n) {
      steps.push({
        arr: [...a],
        comparing: [i, right],
        swapped: false,
      });
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];

      steps.push({
        arr: [...a],
        comparing: [i, largest],
        swapped: true,
      });

      heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
    heapify(a.length, i);
  }

  // Extract elements from heap
  for (let i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];

    steps.push({
      arr: [...a],
      comparing: [0, i],
      swapped: true,
    });

    heapify(i, 0);
  }

  steps.push({
    arr: [...a],
    comparing: [],
    swapped: false,
  });

  return steps;
};

// Example usage
console.log(heapSortSteps([5, 3, 8, 4, 2]));

const heapsort = async (req, res) => {

}

module.exports = { heapsort };