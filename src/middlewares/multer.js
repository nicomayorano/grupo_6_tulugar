const multer = require('multer');
const path = require('path');

// eslint-disable-next-line consistent-return
const upload = (directory, limits) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = path.join(process.cwd(), 'src', 'public', directory);
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const config = multer({
    storage,
    fileFilter(req, file, cb) {
      if (String(file.mimetype) === 'image/jpg' || String(file.mimetype) === 'image/jpeg' || String(file.mimetype) === 'image/gif'
      || String(file.mimetype) === 'image/webp' || String(file.mimetype) === 'image/bmp' || String(file.mimetype) === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
        cb(new Error('FORBIDDEN_FILE_EXT'));
      }
    },
    limits: {
      fileSize: limits.size,
      files: limits.files,
    },
  });
  if (limits.files < 1) {
    const err = new Error('Incorrect files limit');
    // eslint-disable-next-line no-console
    console.error(err.stack);
  } else if (limits.files === 1) {
    return config.single('image', limits.files);
  } else {
    return config.array('image', limits.files);
  }
};

module.exports = upload;
