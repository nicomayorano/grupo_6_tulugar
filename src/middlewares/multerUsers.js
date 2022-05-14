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
});

module.exports = upload;
