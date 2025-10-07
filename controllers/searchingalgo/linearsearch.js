const linearsearch = async (req, res) => {
    const a = req.body.arr;
    let arr = JSON.parse(a);
    let num = req.body.num;

    let steps = [];

    for(let i = 0;i < arr.length; i++){
        let step = {
            arr : [...arr],
            found : false,
            index : i
        }

        if(arr[i] == num){
            step.found = true;
            steps.push(step);
            break;
        }else{
            steps.push(step);
        }
    }

    steps.push({
        arr : [...arr],
        found : false,
        index : null
    });

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { linearsearch }