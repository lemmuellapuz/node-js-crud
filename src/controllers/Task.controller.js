const Task = require('../models/Task.model');

const index = async (req, res) => {
    try {
        
        const tasks = await Task.find({})
        res.status(200).json(tasks);

    } catch (error) {
        console.log(error);
        
    }
}

const show = async (req, res) => {
    try {
        const {taskid} = req.params
        const task = await Task.findById(taskid)

        res.status(200).json(task);

    } catch (error) {
        throw new Error(error);
    }
}

const store = async (req, res) => {
    try {

        const task = await Task.create(req.body + {status: false})

        res.status(200).send({
            status: 'Success',
            message: 'Task created',
            data: task
        });

    } catch (error) {
        throw new Error(error);
    }
}

const update = async (req, res) => {
    try {

        const {taskid} = req.params;
        const task = await Task.findByIdAndUpdate(taskid, req.body);

        if(!task){
            res.status(404).json({
                status: 'Error',
                message: 'Resource not found'
            })
        }

        res.status(200).send({
            status: 'Success',
            message: 'Task updated'
        });

    } catch (error) {
        throw new Error(error);
    }
}

const destroy = async (req, res) => {
    try {
        const {taskid} = req.params;
        const task = await Task.findByIdAndDelete(taskid);

        if(!task){
            res.status(404).json({
                status: 'Error',
                message: 'Resource not found'
            })
        }

        res.status(200).send({
            status: 'Success',
            message: 'Task deleted'
        });

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}