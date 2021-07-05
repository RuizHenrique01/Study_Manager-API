const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (request, file, cb) {
        cb(null, new Date()
            .toISOString()
            .replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/png') {
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

module.exports = upload;