const selectionsort = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);

    let steps = [];

    for(let i = 0; i < arr.length - 1; i++){
        let minindex = i;
        for(let j = i + 1; j < arr.length; j++){
            steps.push({
                arr : [...arr],
                comparing : [minindex, j],
                selectedmin : minindex,
                swapped : false
            });

            if(arr[j] < arr[minindex]){
                minindex = j;
            }
        }

        if(minindex != i){

            let flag = arr[i];
            arr[i] = arr[minindex];
            arr[minindex] = flag;

            steps.push({
                arr : [...arr],
                comparing : [i, minindex],
                selectedmin : minindex,
                swapped : true
            });
        }
    }

    steps.push({
        arr : [...arr],
        comparing : [],
        selectedmin : null,
        swapped : false
    });

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { selectionsort }