class DNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const doublyInsertion = (req, res) => {
    const arr = req.body.arr;
    const index = req.body.index;
    const value = req.body.value;

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
        let temp = head;
        while (temp) {
            out.push(temp.val);
            temp = temp.next;
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

    let newNode = new DNode(value);

    if (index === 0) {
        newNode.next = head;
        if (head) head.prev = newNode;
        head = newNode;

        pushStep(newNode, null, newNode.next);

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

        newNode.next = curr;
        newNode.prev = prev;

        if (prev) prev.next = newNode;
        if (curr) curr.prev = newNode;

        pushStep(newNode, prev, curr);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { doublyInsertion };
