class Node{
    constructor(val, left, right){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const helper = (node, steps) => {

    if(node == null) return;

    helper(node.left, steps);
    helper(node.right, steps);
    steps.push(node.val);

}

const postorder = (req, res) => {

    const adj = req.body.adj;
    let steps = [];

    const root = new Node(Object.keys(adj)[0]);
    let q = []

    q.push(root);

    while(q.length != 0){
        let node = q.shift();

        let l = adj[node.val];

        if(l[0] != null){
            let left = new Node(l[0]);
            node.left = left;
            q.push(left);
        }
        if(l[1] != null){
            let right = new Node(l[1]);
            node.right = right;
            q.push(right);
        }
    }

    helper(root, steps);

    return res.status(200).json({
        message : "success",
        arr : steps
    });
}

module.exports = { postorder }