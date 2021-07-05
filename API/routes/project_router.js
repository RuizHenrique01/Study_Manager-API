const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
const authCheck = require('../middleware/auth_check');

router.use(authCheck);

router.post("/", projectController.project_create_new);
router.get("/", projectController.project_find_all);
router.get("/:idProject", projectController.project_find_one);
router.patch("/:idProject", projectController.project_update_project);
router.delete("/:idProject", projectController.project_remove);

module.exports = router;