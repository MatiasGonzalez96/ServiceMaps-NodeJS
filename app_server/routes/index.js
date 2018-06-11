var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
var middleware = require('../auth/middleware');

/* GET Index */
router.get('/', ctrlMain.index);

/* GET Servicios */
router.get('/servicios/:id', ctrlMain.servicios);

/* GET Comentarios */
router.get('/servicios/comentarios/:id', middleware, ctrlMain.comentarios);

module.exports = router;
