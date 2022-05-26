const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(process.cwd(), 'src', 'public', 'usersImages');
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2_000_000, // 2 MB
    files: 1,
  },
  fileFilter(req, file, cb) {
    if (String(file.mimetype) !== 'image/jpg' && String(file.mimetype) !== 'image/jpeg'
    && String(file.mimetype) !== 'image/webp' && String(file.mimetype) !== 'image/bmp'
    && String(file.mimetype) !== 'image/png') {
      cb(new Error('FORBIDDEN_FILE_EXT'));
    }
    cb(null, true);
  },
}).single('image', 1);

module.exports = upload;
