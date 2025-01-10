const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    }
});

/** @type {mongoose.Model} */
const Task = mongoose.model('task', TaskSchema);

module.exports = Task