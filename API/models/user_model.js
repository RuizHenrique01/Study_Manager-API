const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        macth: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    name:{
        type: String,
        required: true, 
    },
    username:{
        type: String,
        required: true,
    }, 
    photo:{
        type: String,
    },
    totalStudyHours:{
        type: Number,
        default: 0
    },
    score:{
        type: Number,
        default: 0  
    },
    trophies:{
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User