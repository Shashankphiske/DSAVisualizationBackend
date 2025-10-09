const dfs = async (req ,res) => {
    const root = req.body.root;
    const num = req.body.num;
    const adjList = req.body.adjList;

    let s = [];
    let steps = [];
    let visited = [];

    s.unshift(root);

    while(s.length != 0){

        let step = {
            stack : [...s],
            neighbours : [],
            current : null,
            found : false
        }

        let n = s.shift();

        let neighbours = adjList[n];

        step.current = n;
        step.neighbours = [...neighbours];

        if(num == n){
            step.found = true;
            steps.push(step);
            break;
        }else{
            steps.push(step);
            for(let i of neighbours){
                if(!visited.includes(i)){
                    s.unshift(i);
                }
            }
        }
    }

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { dfs }