const Project = require('../models/project_model');

exports.project_create_new = async (request, response) => {
    const project = new Project(request.body);

    project.idUser = request.userId;

    try {

        await project.save();

    } catch (err) {
        return response.status(400).json({
            error: "Failed in create project!"
        });
    }

    return response.status(200).json({ project: project });
};

exports.project_find_one = async (request, response) => {
    const project = await Project.findOne({
        _id: request.params.idProject,
        idUser: request.userId
    });

    if (!project)
        throw new Error("Project not found!");

    return response.status(200).json({ project: project });
};

exports.project_find_all = async (request, response) => {
    const projects = await Project.find({ idUser: request.userId });

    return response.status(200).json({ projects: projects });
};

exports.project_update_project = async (request, response) => {
    const project = await Project.findOneAndUpdate({
        _id: request.params.idProject,
        idUser: request.userId
    },
        request.body,
        { new: true }
    );

    if (!project)
        throw new Error("Project not found!");

    return response.status(200).json({ project: project });
};

exports.project_remove = async (request, response) => {
    const project = await Project.findOneAndDelete({
        _id: request.params.idProject,
        idUser: request.userId
    });

    if (!project)
        throw new Error("Project not found!");

    return response.status(200).json({ message: "Project deleted!" });
};
