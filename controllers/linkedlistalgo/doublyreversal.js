class DNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const doublyReverse = (req, res) => {
    const arr = req.body.arr;

    let steps = [];

    let head = null, tail = null;
    for (let v of arr) {
        let newNode = new DNode(v);
        if (!head) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
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

    let curr = head;
    let temp = null;

    while (curr) {
        let nextNode = curr.next;
        let prevNode = curr.prev;

        pushStep(curr, prevNode, nextNode);

        temp = curr.prev;
        curr.prev = curr.next;
        curr.next = temp;

        pushStep(curr, curr.prev, curr.next);

        curr = curr.prev;
    }

    if (temp) {
        head = temp.prev;
    }

    pushStep(null, null, null);

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { doublyReverse };
