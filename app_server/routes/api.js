var express = require('express');
var router = express.Router();

const ctrlServicios = require('../controllers/serviciosAPI');
const ctrlComentarios = require('../controllers/comentariosAPI');

//Servicios
router.get('/servicios', ctrlServicios.getServicios);

//comentarios
router.post('/comentarios/:id', ctrlComentarios.setComentario);

module.exports = router;
