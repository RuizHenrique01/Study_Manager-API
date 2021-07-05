const Project = require('../models/project_model');
const Task = require("../models/task_model");

exports.task_add_new_task = async (request, response) => {
    const task = new Task(request.body);

    const project = await Project.findOne({
        _id: request.params.idProject,
        idUser: request.userId
    });

    if (!project)
        throw new Error("Project not found!");

    task.idProject = project._id;

    try {
        project.tasks.push(task._id);
    } catch (err) {
        return response.status(400).json({
            error: "Failed in create task!"
        });
    }

    try {
        await task.save();
    } catch (err) {
        return response.status(400).json({
            error: "Failed in create task!"
        });
    }

    return response.status(200).json({ task: task });
};

exports.task_get_all = async (request, response) => {
    const task = await Task.find({ idProject: request.params.idProject });

    return response.status(200).json({ tasks: task });
}

exports.task_get_one = async (request, response) => {
    const task = await Task.findOne({
        idProject: request.params.idProject,
        _id: request.params.idTask
    });

    if (!task)
        throw new Error("Task not found!");

    return response.status(200).json({ task: task });
};

exports.task_update = async (request, response) => {
    const task = await Task.findOneAndUpdate({
        idProject: request.params.idProject,
        _id: request.params.idTask
    },
        request.body,
        { new: true }
    );

    if (!task)
        throw new Error("Task not found!");

    return response.status(200).json({ tasks: task });
};

exports.task_remove = async (request, response) => {
    const task = await Task.findOneAndDelete({
        idProject: request.params.idProject,
        _id: request.params.idTask
    });

    if (!task)
        throw new Error("Task not found!");

    return response.status(200).json({ message: "Task deleted!" });
};
