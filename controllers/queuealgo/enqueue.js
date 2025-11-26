const enqueue = (req, res) => {
    let queue = req.body.queue;     // existing queue
    const toEnqueue = req.body.enqueue; // values to insert

    let steps = [];

    const addStep = (action, current, prev, next, highlight, list) => {
        steps.push({
            action,
            pointer: { current, prev, next },
            highlight,
            list: [...list]
        });
    };

    for (let value of toEnqueue) {
        const prevRear = queue.length > 0 ? queue[queue.length - 1] : null;

        // Before enqueue
        addStep("enqueue-start", value, prevRear, null, [value], queue);

        // Actual enqueue (at rear)
        queue.push(value);

        // After enqueue
        addStep("enqueue-complete", null, prevRear, value, [value], queue);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};


module.exports = { enqueue }