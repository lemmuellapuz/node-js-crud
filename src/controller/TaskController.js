const index = (req, res) => {
    res.send('show all tasks');
}

const show = (req, res) => {
    res.send('show task id:' + req.params.taskid);
}

const store = (req, res) => {
    res.send('store task');
}

const update = (req, res) => {
    res.send('update task id: ' + req.params.taskid);
}

const destroy = (req, res) => {
    res.send('delete task id:' + req.params.taskid);
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}