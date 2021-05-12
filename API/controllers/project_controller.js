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
    Project.find({ _id : idProject}).exec().then(result => {
        if (result.length > 0) {
            if (result[0].idUser == idUser) {
                res.status(200).json({
                    project: result
                });
            } else {
                res.status(404).json({ message: "Not found this project!"});
            }
        } else {
            res.status(404).json({ message: "Not found this project!"});
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
