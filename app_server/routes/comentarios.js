var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/comentarios');

/* GET home page. */
router.get('/', ctrlMain.comentarios);
module.exports = router;