const Task = require('../models/Task.model');
const { paginate } = require('../utils/Helper.utils')

const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        
        const tasks = await paginate(Task, page, limit, {})
        res.status(200).json(tasks);

    } catch (error) {
        throw new Error(error);
        
    }
}

const show = async (req, res) => {
    try {
        const {taskid} = req.params
        const task = await Task.findById(taskid)

        if(!task)
            res.status(404).json({
                status: 'Error',
                message: 'Resource not found'
            })

        res.status(200).json(task);

    } catch (error) {
        throw new Error(error);
    }
}

const store = async (req, res) => {
    try {

        const task = await Task.create({ ...req.body, status: false })

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