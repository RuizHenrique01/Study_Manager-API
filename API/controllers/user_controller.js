const User = require('../models/user_model');
const env = require('../commons/environments');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');

exports.user_find_one = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
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
    User.findOne({ email: email }).then(doc => {
        if (doc) {
            res.status(409).json({
                message: "This email already exist!"
            });
        } else {
            const password = req.body.password;
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    const user = new User(req.body);
                    user.password = hash;
                    user.save().then(result => {
                        if (result) {
                            res.status(201).json({
                                user: result
                            });
                            next();
                        } else {
                            res.status(500).json({
                                message: "Error in create account!"
                            });
                        }
                    }).catch(err => {
                        res.status(500).json({
                            error: err.message
                        });
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
            const password = req.body.password;
            bcrypt.compare(password, doc.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth Failed"
                    });
                } else {
                    if (result) {
                        const token = jwt.sign({
                            email: doc.email,
                            userId: doc._id
                        }, env.JWT_KEY);
                        return res.status(200).json({
                            message: "Auth Success!",
                            UserId: doc._id,
                            token: token
                        });
                    } else {
                        res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                }
            });
        } else {
            res.status(401).json({
                message: "Auth Failed"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
}

exports.user_validate = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
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

exports.user_update = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
    User.findOneAndUpdate({ _id: id }, req.body).exec().then(result => {
            res.status(200).json({
                message: "Success in Update!",
                user: result
            });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.user_delete = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
    User.deleteOne({ _id: id }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Success in delete account!"
            });
        } else {
            res.status(500).json({
                message: "Error in delete account!"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.user_get_photo = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
    User.findById({ _id: id }).exec().then(result => {
        if (result) {
            if (result.photo) {
                res.status(200).json({
                    photo: result.photo,
                    link: `/${result.photo}`
                });
            }else {
                res.status(404).json({
                    message: "Not found photo!"
                });
            }
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.user_update_photo = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
    User.findById({ _id: id }).exec().then(result => {
        if (result) {
            if (result.photo) {
                fs.remove(result.photo);
            }
            result.photo = req.file.path;
            result.save().then(doc => {
                if (doc) {
                    res.status(200).json({
                        message: "Success in Update Photo!",
                        photo: result.photo,
                        url: "/" + result.photo
                    });
                } else {
                    res.status(500).json({
                        message: "Error in Update Photo!"
                    });
                }
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};

exports.user_remove_photo = (req, res, next) => {
    const id = req.headers.userid.split(" ")[0];
    User.findById({ _id: id }).exec().then(result => {
        if (result) {
            if (result.photo) {
                fs.remove(result.photo);
                User.findOneAndUpdate({_id : id}, {$unset:{photo:1}}).then(doc => {
                    if (doc) {
                        res.status(200).json({
                            message: "Success in Remove Photo!",
                        });
                    } else {
                        res.status(500).json({
                            message: "Error in Update Photo!"
                        });
                    }
                });
            }else{
                res.status(404).json({
                    message: "Not found Photo!"
                }); 
            }
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
};