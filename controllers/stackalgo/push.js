const push = (req, res) => {
    let stack = req.body.stack;    
    const toPush = req.body.push;   

    let steps = [];

    const addStep = (action, current, prev, next, highlight, list) => {
        steps.push({
            action,
            pointer: { current, prev, next },
            highlight,
            list: [...list]
        });
    };

    for (let value of toPush) {
        const prevTop = stack.length > 0 ? stack[stack.length - 1] : null;

        addStep("push-start", value, prevTop, null, [value], stack);

        stack.push(value);

        addStep("push-complete", null, prevTop, value, [value], stack);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};


module.exports = { push }