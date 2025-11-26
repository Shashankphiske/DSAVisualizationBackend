const helper = (node, steps) => {
  if (node === null) return;

  helper(node.left, steps);

  steps.push(node.val);

  helper(node.right, steps);
};

class Node{
    constructor(val, left = null, right = null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const inorder = (req, res) => {
    let adj = req.body.adj;

    let steps = [];

    let k = Object.keys(adj);
    let q = [];

    let root = new Node(k[0]);

    q.push(root);

    while(q.length != 0){
        let node = q.shift();

        let l = adj[node.val]
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

module.exports = { inorder }