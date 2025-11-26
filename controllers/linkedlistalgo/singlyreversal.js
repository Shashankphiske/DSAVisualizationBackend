class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const singlyReverse = (req, res) => {
    const arr = req.body.arr;

    let steps = [];

    let head = null, tail = null;
    for (let v of arr) {
        let node = new Node(v);
        if (!head) {
            head = node;
            tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    const getList = () => {
        let out = [];
        let t = head;
        while (t) {
            out.push(t.val);
            t = t.next;
        }
        return out;
    };

    const pushStep = (current, prev, next) => {
        steps.push({
            current: current ? current.val : null,
            prev: prev ? prev.val : null,
            next: next ? next.val : null,
            list: getList()
        });
    };

    pushStep(null, null, null);

    let prev = null;
    let curr = head;

    while (curr) {
        let nextNode = curr.next;

        pushStep(curr, prev, nextNode);

        curr.next = prev;

        prev = curr;
        curr = nextNode;

        pushStep(prev, null, curr);
    }

    head = prev;

    pushStep(null, null, null);

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { singlyReverse };
