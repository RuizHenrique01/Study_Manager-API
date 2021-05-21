const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();
const multer = require('multer');
const authCheck = require('../middleware/auth_check');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

router.get("/", authCheck, userController.user_find_one);
router.post("/signup", userController.user_creat_account);
router.post("/login", userController.user_login);
router.patch("/", authCheck, userController.user_validate, userController.user_update);
router.delete("/", authCheck, userController.user_validate, userController.user_delete);
router.patch("/photo", authCheck,userController.user_validate, upload.single('photo'), userController.user_update_photo);
router.delete("/photo", authCheck, userController.user_validate, userController.user_remove_photo);

module.exports = router;