const Project = require('../models/project_model');

exports.project_create_new = (req, res, next) => {
    const project = new Project(req.body);
    project.idUser = req.params.idUser;
    project.save().then(result => {
        if (result) {
            res.status(201).json({
                project: result
            });
        } else {
            res.status(500).json({
                message: "Error in create project!"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.project_find_one = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    Project.find({ _id: idProject, idUser: idUser }).exec().then(result => {
        if (result.length > 0) {
            res.status(200).json({
                project: result
            });
        } else {
            res.status(404).json({ message: "Not found this project!" });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.project_find_all = (req, res, next) => {
    const idUser = req.params.idUser;
    Project.find({ idUser: idUser }).exec().then(result => {
        if (result.length > 0) {
            res.status(200).json({
                projects: result
            });
        } else {
            res.status(200).json([]);
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.project_update_project = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    Project.updateOne({ _id: idProject, idUser: idUser }, req.body).exec().then(result => {
        if (result.n) {
            Project.find({ _id: idProject, idUser: idUser }).then(doc => {
                res.status(200).json({
                    project: doc[0]
                });
            });
        } else {
            res.status(404).json({ message: "Not found this project!" });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.project_remove = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    Project.remove({ _id: idProject, idUser: idUser }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Success removed!"
            })
        } else {
            res.status(500).json({
                error: err.message
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.project_exists = (req, res, next) => {
    const idProject = req.params.idProject;
    const idUser = req.params.idUser;
    Project.find({ _id: idProject, idUser: idUser }).exec().then(doc => {
        if (doc.length > 0) {
            next()
        } else {
            res.status(404).json({ message: "Not found this project!" });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

