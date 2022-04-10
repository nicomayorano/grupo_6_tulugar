const { Router } = require('express');
const mainController = require('../controllers/mainController');

const router = new Router();

const keys = Object.keys(mainController);
const values = Object.values(mainController);
for (let i = 0; i < keys.length; i += 1) {
  router.get(`/${keys[i] === 'index' ? '/' : keys[i]}`, values[i]);
}

module.exports = router;
