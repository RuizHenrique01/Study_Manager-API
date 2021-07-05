const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();
const authCheck = require('../middleware/auth_check');
const upload = require("../middleware/upload_file");

router.post("/signup", userController.user_signup);
router.post("/login", userController.user_login);

router.use(authCheck);

router.get("/", userController.user_find_one);
router.patch("/", userController.user_update);
router.delete("/", userController.user_delete);
router.get("/photo", userController.user_get_photo);
router.patch("/photo", upload.single('photo'), userController.user_update_photo);
router.delete("/photo", userController.user_remove_photo);

module.exports = router;