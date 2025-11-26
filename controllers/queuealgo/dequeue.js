const dequeue = (req, res) => {
    let queue = req.body.queue;   // existing queue
    const dequeueList = req.body.dequeue;  // number of times to dequeue (length used)

    let steps = [];

    const addStep = (action, current, prev, next, highlight, list) => {
        steps.push({
            action,
            pointer: { current, prev, next },
            highlight,
            list: [...list]
        });
    };

    for (let _ of dequeueList) {
        if (queue.length === 0) {
            addStep("dequeue-start", null, null, null, [], queue);
            addStep("dequeue-complete", null, null, null, [], queue);
            continue;
        }

        const front = queue[0];
        const newFront = queue.length > 1 ? queue[1] : null;

        // Before dequeue
        addStep("dequeue-start", front, null, newFront, [front], queue);

        // Remove front element
        queue.shift();

        // After dequeue
        addStep("dequeue-complete", null, null, newFront, [newFront], queue);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};

module.exports =  { dequeue }