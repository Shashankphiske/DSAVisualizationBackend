class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const singlyDeletion = (req, res) => {
    const arr = req.body.arr;
    const index = req.body.index;

    let steps = [];

    let head = null, tail = null;

    for (let v of arr) {
        let newNode = new Node(v);
        if (!head) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
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

    if (index === 0) {
        pushStep(head, null, head.next);
        head = head.next;
        pushStep(null, null, null);
    } else {
        let curr = head;
        let prev = null;
        let i = 0;

        while (curr && i < index) {
            pushStep(curr, prev, curr.next);
            prev = curr;
            curr = curr.next;
            i++;
        }

        if (curr && prev) {
            pushStep(curr, prev, curr.next);
            prev.next = curr.next;
            pushStep(null, prev, curr.next);
        }
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { singlyDeletion };
