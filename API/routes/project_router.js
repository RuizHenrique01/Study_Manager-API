const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const projectController = require('../controllers/project_controller');

router.post("/:idUser", userController.user_validate, projectController.project_create_new);
router.get("/:idUser", userController.user_validate, projectController.project_find_all);
router.get("/:idUser/project/:idProject", userController.user_validate, projectController.project_find_one);

module.exports = router;