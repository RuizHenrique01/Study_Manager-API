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
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get("/:id", authCheck, userController.user_find_one);
router.post("/signup", userController.user_creat_account, upload.single('productImage'));
router.post("/login", userController.user_login);

module.exports = router;