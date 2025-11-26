class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const singlyinsertion = (req, res) => {
    const arr = req.body.arr;
    const index = req.body.index;
    const value = req.body.value;

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

    let newNode = new Node(value);

    if (index === 0) {
        newNode.next = head;
        head = newNode;

        pushStep(newNode, null, newNode.next);
    } else {
        let prev = null;
        let curr = head;
        let i = 0;

        while (curr !== null && i < index) {
            pushStep(curr, prev, curr.next);
            prev = curr;
            curr = curr.next;
            i++;
        }

        newNode.next = curr;
        prev.next = newNode;

        pushStep(newNode, prev, curr);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { singlyinsertion };
