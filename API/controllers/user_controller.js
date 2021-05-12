const User = require('../models/user_model');

exports.user_find_one = (req, res, next) => {
    const id = req.params.id;
    User.findOne({ _id: id }).exec().then(doc => {
        if (doc) {
            res.status(200).json({
                user: doc
            })
        } else {
            res.status(404).json({
                message: "Not found this user!"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.user_creat_account = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email }).exec().then(doc => {
        if (doc) {
            res.status(407).json({
                message: "This email already exist!"
            });
        } else {
            const user = new User(req.body);
            user.save().then(result => {
                if (result) {
                    res.status(201).json({
                        user: result
                    });
                } else {
                    res.status(500).json({
                        message: "Error in create account!"
                    });
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
}

exports.user_login = (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email }).exec().then(doc => {
        if (doc) {
            if (doc.password == req.body.password) {
                res.status(200).json({
                    user: doc
                });
            }else{
                res.status(407).json({
                    message:"Failed Login: Email or password is wrong!"
                }); 
            }
        } else {
            res.status(407).json({
                message:"Failed Login: Email or password is wrong!"
            }); 
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
}

exports.user_validate = (req, res, next) => {
    const id = req.params.idUser;
    User.findOne({ _id: id }).exec().then(doc => {
        if (doc) {
            next();
        } else {
            res.status(404).json({
                message: "Not found this user!"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};