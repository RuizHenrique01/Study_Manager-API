const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
require("express-async-errors");

app.use(cors());
const userRouter = require('./API/routes/user_router');
const projectRouter = require('./API/routes/project_router');
const taskController = require('./API/routes/task_router');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    return response.json({ 
        "message" : "Welcome to Study Manager API",
        "Link da documentação da API" : "https://github.com/RuizHenrique01/Study_Manager-API/blob/master/documentation.md",
        "Link da API no GitHub" : "https://github.com/RuizHenrique01/Study_Manager-API"
    });
});

app.use("/user", userRouter);
app.use("/projects", projectRouter);
app.use("/projects", taskController);

app.use((err, request, response, next) => {
    if (err instanceof Error)
        return response.status(400).json({ error: err.message });

    return response.status(500).json({ error: "Internal Server Error!" });
});

module.exports = app;