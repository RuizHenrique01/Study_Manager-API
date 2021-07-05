const mongoose = require('../database');

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
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;