var express = require('express');
var router = express.Router();

const ctrlServicios = require('../controllers/serviciosAPI');
const ctrlComentarios = require('../controllers/comentariosAPI');
const ctrlTema = require('../controllers/temasAPI');

//Servicios
router.get('/servicios', ctrlServicios.getServicios);

//comentarios
router.post('/comentarios/:id', ctrlComentarios.setComentario);

//Tema
router.get('/tema', ctrlTema.getTema);
router.post('/tema', ctrlTema.setTema);

module.exports = router;
