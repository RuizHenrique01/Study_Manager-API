const mongoose = require('../database');

const tasksSchema = mongoose.Schema({
    idProject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    date:{
        type: Date
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;