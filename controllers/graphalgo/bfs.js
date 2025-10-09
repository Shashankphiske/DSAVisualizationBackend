const bfs = async (req, res) => {
    const adjList = req.body.adjList;
    const num = req.body.num;
    const root = req.body.root;

    let q = [];
    let steps = [];
    let visited = [];

    q.push(root);

    while(q.length != 0){
        let dq = [...q];
        let n = q.shift();
        visited.push(n);

        let neighbours = adjList[n];

        let step = {
            num : n,
            neighbours : neighbours,
            found : false,
            queue : dq
        }

        if(n == num){
            step.found = true;
            steps.push(step);
            break;
        }else{
            steps.push(step);
            for(let i of neighbours){
                if(!visited.includes(i)){
                    q.push(i);
                }
            }
        }

    }

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { bfs }