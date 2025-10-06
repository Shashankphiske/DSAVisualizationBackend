const insertionsort = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);

    let steps = [];

    for(let i = 1; i < arr.length; i++){
        let key = arr[i];
        let j = i - 1;

        steps.push({
            arr : [...arr],
            comparing : [j, i],
            keyindex : i,
            swapped : false
        });

        while(j >=0 && arr[j] > key){
            let flag = arr[j+1];
            arr[j + 1] = arr[j];
            arr[j] = flag;
            steps.push({
                arr : [...arr],
                comparing : [j, j+1],
                keyindex : i,
                swapped : true
            });

            j--;
        }

        a[j + 1] = key;

        steps.push({
            arr : [...arr],
            comparing : [j + 1, j],
            keyindex : i,
            swapped : true
        });
    }

    steps.push({
        arr : [...arr],
        comparing : [],
        keyindex : null,
        swapped : false
    })

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { insertionsort }