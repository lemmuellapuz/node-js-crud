const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('show all tasks');
});

router.get('/:taskid', (req, res) => {
    res.send('show task id:' + req.params.taskid);
});

router.post('/', (req, res) => {
    res.send('store task');
});

router.put('/:taskid', (req, res) => {
    res.send('update task id: ' + req.params.taskid);
});

router.delete('/:taskid', (req, res) => {
    res.send('delete task id:' + req.params.taskid);
});

module.exports = router;