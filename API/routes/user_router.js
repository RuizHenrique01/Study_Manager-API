const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();

router.get("/:id", userController.user_find_one);
router.post("/singup", userController.user_creat_account);
router.post("/login", userController.user_login);

module.exports = router;