const Project = require('../models/project_model');

exports.task_add_new_task = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.headers.userid.split(" ")[0];
    Project.find({ _id: idProject, idUser: idUser }).exec().then(result => {
            result[0].tasks.push(req.body);
            result[0].save().then(doc => {
                if (doc) {
                    res.status(201).json({
                        project: doc
                    });
                } else {
                    res.status(500).json({
                        message: "Error in add task!"
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    error: err.message
                });
            });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.task_get_all = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.headers.userid.split(" ")[0];
    Project.find({ _id: idProject, idUser: idUser }).exec().then(result => {
            res.status(200).json({
                tasks: result[0].tasks
            });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.task_get_one = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.headers.userid.split(" ")[0];
    const idTask = req.params.idTask;
    Project.find({ _id: idProject, idUser: idUser })
        .exec().then(result => {
            if (result[0].tasks.id(idTask)) {
                res.status(200).json({
                    task: result[0].tasks.id(idTask)
                });
            } else {
                res.status(404).json({ message: "Not found this task!" });
            }
        }).catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.task_remove = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.headers.userid.split(" ")[0];
    const idTask = req.params.idTask;
    Project.find({ _id: idProject, idUser: idUser })
        .exec().then(result => {
            if (result[0].tasks.id(idTask)) {
                result[0].tasks.id(idTask).remove()
                result[0].save().then(doc => {
                    if (doc) {
                        res.status(200).json({
                            message: "Success remove!"
                        });
                    } else {
                        res.status(500).json({
                            message: "Error in remove task!"
                        });
                    }
                });
            } else {
                res.status(404).json({ message: "Not found this task!" });
            }
        }).catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.task_update = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.headers.userid.split(" ")[0];
    const idTask = req.params.idTask;
    Project.find({ _id: idProject, idUser: idUser })
        .exec().then(result => {
            if (result[0].tasks.id(idTask)) {
                result[0].tasks.id(idTask).set(req.body);
                result[0].save().then(doc => {
                    if (doc) {
                        res.status(200).json({
                            task: doc.tasks.id(idTask)
                        });
                    } else {
                        res.status(500).json({
                            message: "Error in update task!"
                        });
                    }
                });
            } else {
                res.status(404).json({ message: "Not found this task!" });
            }
        }).catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};