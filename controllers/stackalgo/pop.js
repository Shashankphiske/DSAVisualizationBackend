const pop = (req, res) => {
    let stack = req.body.stack;
    const popList = req.body.pop;

    let steps = [];

    const addStep = (action, current, prev, next, highlight, list) => {
        steps.push({
            action,
            pointer: { current, prev, next },
            highlight,
            list: [...list]
        });
    };

    for (let _ of popList) {
        if (stack.length === 0) {
            addStep("pop-start", null, null, null, [], stack);
            addStep("pop-complete", null, null, null, [], stack);
            continue;
        }

        const currentTop = stack[stack.length - 1];
        const newTop = stack.length > 1 ? stack[stack.length - 2] : null;

        addStep("pop-start", currentTop, newTop, null, [currentTop], stack);

        stack.pop();

        addStep("pop-complete", null, newTop, null, [newTop], stack);
    }

    return res.status(200).json({
        message: "success",
        steps
    });
};


module.exports = { pop }