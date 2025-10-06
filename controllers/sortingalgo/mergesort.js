const mergesort = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);

    let steps = [];

    const merge = (left, right, startIndex) => {
      let result = [];
      let i = 0, j = 0;

      while (i < left.length && j < right.length) {
        steps.push({
          arr: [...arr],
          comparing: [startIndex + i, startIndex + left.length + j],
          mergedIndexes: result.map((_, idx) => startIndex + idx),
          swapped: false,
        });

        if (left[i] <= right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) result.push(left[i++]);
      while (j < right.length) result.push(right[j++]);

      for (let k = 0; k < result.length; k++) {
        arr[startIndex + k] = result[k];

        steps.push({
          arr: [...arr],
          comparing: [startIndex + k],
          mergedIndexes: [startIndex + k],
          swapped: true,
        });
      }

      return result;
    };

    const mergeSort = (subArr, startIndex = 0) => {
      if (subArr.length <= 1) return subArr;

      const mid = Math.floor(subArr.length / 2);
      const left = mergeSort(subArr.slice(0, mid), startIndex);
      const right = mergeSort(subArr.slice(mid), startIndex + mid);

      return merge(left, right, startIndex);
    };

    mergeSort([...arr]);

    steps.push({
      arr: [...arr],
      comparing: [],
      mergedIndexes: [],
      swapped: false,
    });

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}



module.exports = { mergesort }