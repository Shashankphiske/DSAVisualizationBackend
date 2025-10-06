const quicksort = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);

    let steps = [];

  const partition = (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        arr: [...arr],
        comparing: [j, high],
        pivotIndex: high,
        swapped: false,
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          arr: [...arr],
          comparing: [i, j],
          pivotIndex: high,
          swapped: true,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      arr: [...arr],
      comparing: [i + 1, high],
      pivotIndex: high,
      swapped: true,
    });

    return i + 1;
  };

  const quickSort = (arr, low, high) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  };

  quickSort(arr, 0, arr.length - 1);

  steps.push({
    arr: [...arr],
    comparing: [],
    pivotIndex: null,
    swapped: false,
  });
  
  return res.status(200).json({
    message : "success",
    arr : steps
  });
}

module.exports = { quicksort }