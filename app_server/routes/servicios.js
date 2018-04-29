var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/servicios');

/* GET home page. */
router.get('/', ctrlMain.servicios);
module.exports = router;