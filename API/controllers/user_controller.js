const User = require('../models/user_model');
const env = require('../commons/environments');
const { hash, compare } = require("bcrypt");
const { sign } = require('jsonwebtoken');
const fs = require('fs-extra');

exports.user_signup = async (request, response) => {
    const { email, password } = request.body;

    if (!email)
        throw new Error("Email incorrect!");

    if (!password || password.length < 6)
        throw new Error("Password incorrect!");

    const verifyUserExists = await User.findOne({ email: email });

    if (verifyUserExists)
        throw new Error("Email already exists!");

    const user = new User(request.body);

    user.password = await hash(password, 10);

    try {
        await user.save();
    } catch (err) {
        return response.status(400).json({ error: "Error in create User!" });
    }

    const token = generatorToken(user);

    return response.status(201).json({ token: token });
}

exports.user_login = async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email }).select("+password");

    if (!user)
        throw new Error("Email/Password incorrect!");

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
        throw new Error("Email/Password incorrect!");

    const token = generatorToken(user);

    return response.status(200).json({ token: token });
}

function generatorToken(user) {
    return sign({
        email: user.email,
        userid: user._id
    },
        env.JWT_KEY,
        {
            expiresIn: "1d"
        });
}

exports.user_find_one = async (request, response) => {
    const user = await User.findById(request.userId).select("+password");

    if (!user)
        throw new Error("User not found!");

    return response.status(200).json({ user: user });
};

exports.user_update = async (request, response) => {
    const user = await User.findByIdAndUpdate(
        request.userId,
        request.body,
        { new: true }
    );

    if (!user)
        throw new Error("User not found!");

    return response.status(200).json({ user: user });
};

exports.user_delete = async (request, response) => {
    const user = await User.findByIdAndDelete(request.userId);

    if (!user)
        throw new Error("User not found!");

    return response.status(200).json({ message: "User deleted!" });
};

exports.user_update_photo = async (request, response) => {
    if (request.file === undefined)
        throw new Error("Photo is required, check if the argument is empty");

    const user = await User.findById(request.userId);

    if (!user)
        throw new Error("User not found!");

    if (user.photo)
        fs.remove(user.photo);

    user.photo = request.file.path;

    try {
        await user.save();
    } catch (err) {
        return response.status(400).json({ error: "Error in update photo!" });
    }

    return response.status(200).json({
        photo: user.photo,
        url: "http://localhost:3000/" + user.photo
    });
};

exports.user_get_photo = async (request, response) => {
    const user = await User.findById(request.userId);

    if (!user)
        throw new Error("User not found!");

    if (!user.photo)
        throw new Error("Photo not found!");

    return response.status(200).json({
        photo: user.photo,
        url: "http://localhost:3000/" + user.photo
    });
};

exports.user_remove_photo = async (request, response) => {
    const user = await User.findById(request.userId);

    if (!user)
        throw new Error("User not found!");

    if (!user.photo)
        throw new Error("Photo not found!");

    if (user.photo)
        fs.remove(user.photo);

    try {
        await User.findOneAndUpdate(
            { _id: request.userId },
            { $unset: { photo: 1 } });
    } catch (err) {
        response.status(400).json({ message: "Error in Remove Photo!" });
    }

    return response.status(200).json({ message: "Success in Removed Photo!" });
};