const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// const upload = multer({ storage: storage }).fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'images', maxCount: 6 }
// ]);

const single = multer({ storage: storage });

module.exports = { single };