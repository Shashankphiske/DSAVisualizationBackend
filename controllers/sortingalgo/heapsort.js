const heapsort = async (req, res) => {
  const a = req.body.arr;
  let arr = JSON.parse(a);

  let steps = [];

  const heapify = (n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Compare left child
    if (left < n) {
      steps.push({
        arr: [...arr],
        comparing: [i, left],
        heapRange: n,
        swapped: false,
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare right child
    if (right < n) {
      steps.push({
        arr: [...arr],
        comparing: [largest, right],
        heapRange: n,
        swapped: false,
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // Swap if needed
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        arr: [...arr],
        comparing: [i, largest],
        heapRange: n,
        swapped: true,
      });

      heapify(n, largest);
    }
  };

  const heapSort = () => {
    const n = arr.length;

    // 🔹 Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    // 🔹 Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];

      steps.push({
        arr: [...arr],
        comparing: [0, i],
        heapRange: i,
        swapped: true,
      });

      // Heapify reduced heap
      heapify(i, 0);
    }
  };

  heapSort();

  // Final step
  steps.push({
    arr: [...arr],
    comparing: [],
    heapRange: 0,
    swapped: false,
  });

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { heapsort };
