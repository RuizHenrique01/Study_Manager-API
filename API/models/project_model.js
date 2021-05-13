const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
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

const projectSchema = mongoose.Schema({
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    tasks:[tasksSchema]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;