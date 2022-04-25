const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');

const adminRouter = new Router();
// =================================================== MULTER ========
const storage = multer.diskStorage({
destination: (req, file, cb) =>{
    let folder = path.join(__dirname, '../../public/propietiesImages');
    cb(null, folder); 
},
filename:(req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
},
});

const upload = multer({ storage });
// ------------------------------------------------------fin bloque multer-------

adminRouter.post('/', adminController.index);

adminRouter.get('/edit/:id', adminController.editForm);
adminRouter.put('/edit/:id', upload.any("image"), adminController.edit);

adminRouter.get('/new', adminController.newForm);
adminRouter.post('/new', adminController.new);

module.exports = adminRouter;
