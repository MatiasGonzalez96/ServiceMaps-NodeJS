var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');

/* GET Index */
router.get('/', ctrlMain.index);

/* GET Servicios */
router.get('/servicios/:id', ctrlMain.servicios);

/* GET Comentarios */
router.get('/servicios/comentarios/:id', ctrlMain.comentarios);

module.exports = router;