var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
const middleware = require('../auth/middleware');

/* GET Index */
router.get('/', middleware, ctrlMain.index);

/* GET Servicios */
router.get('/servicios/:id', ctrlMain.servicios);

/* GET Comentarios */
router.get('/servicios/comentarios/:id', ctrlMain.comentarios);

module.exports = router;
