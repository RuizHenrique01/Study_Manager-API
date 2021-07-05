const express = require('express');
const router = express.Router();

const taskController = require("../controllers/task_controller");
const authCheck = require('../middleware/auth_check');

router.use(authCheck);

router.post("/:idProject/task", taskController.task_add_new_task);
router.get("/:idProject/task", taskController.task_get_all);
router.get("/:idProject/task/:idTask", taskController.task_get_one);
router.delete("/:idProject/task/:idTask", taskController.task_remove);
router.patch("/:idProject/task/:idTask", taskController.task_update);

module.exports = router;