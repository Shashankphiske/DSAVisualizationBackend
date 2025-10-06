const bubblesort = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);
    let steps = [];

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j <= (arr.length-i-2); j++){

            let step = {
                arr : [...arr],
                comparing : [ j, j + 1 ],
                swapped : false
            }

            if(arr[j] > arr[j + 1]){
                step.swapped = true
                let flag = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = flag
            }

            steps.push(step);
        }
    }

    steps.push({ arr : [...arr], comparing : [], swapped : false });

    return res.status(200).json({
        message : "success",
        arr : steps
    });

}

module.exports = { bubblesort }