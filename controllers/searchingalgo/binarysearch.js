const binarysearch = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);
    let num = req.body.num;

    let steps = [];

    let left = 0;
    let right = arr.length - 1;
    let mid = Math.round((left + right) / 2);

    while(left <= right){

        let step = {
            arr : [...arr],
            left : left,
            right : right,
            mid : mid,
            found : false
        }

        if(arr[mid] == num){
            step.found = true;
            steps.push(step);
            break;
        }else if(num < arr[mid]){
            right = mid - 1;
            mid = Math.round((left + right) / 2);
        }else if(num > arr[mid]){
            left = mid + 1;
            mid = Math.round((left + right) / 2);
        }

        steps.push(step);
    }

    return res.status(200).json({
        message : "success",
        arr : steps
    });

}

module.exports = { binarysearch }