class DNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

const doublyDeletion = (req, res) => {
    const arr = req.body.arr;
    const index = req.body.index;

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

    if (index === 0) {
        pushStep(head, null, head.next);
        
        let nextNode = head.next;
        if (nextNode) nextNode.prev = null;
        head = nextNode;
        
        pushStep(null, null, head);
        
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

        if (curr) {
            pushStep(curr, prev, curr.next);

            let nextNode = curr.next;

            if (prev) prev.next = nextNode;
            if (nextNode) nextNode.prev = prev;

            pushStep(null, prev, nextNode);
        }
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports = { doublyDeletion };
