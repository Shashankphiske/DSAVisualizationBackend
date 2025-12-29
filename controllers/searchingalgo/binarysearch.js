const binarysearch = async (req, res) => {
  const a = req.body.arr;
  let arr = JSON.parse(a);
  const num = req.body.num;

  let steps = [];

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // ✅ FIXED

    let step = {
      arr: [...arr],
      left,
      right,
      mid,
      found: false,
    };

    if (arr[mid] == num) {
      step.found = true;
      steps.push(step);
      break;
    }

    steps.push(step); // ✅ push BEFORE changing bounds

    if (num < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { binarysearch };
