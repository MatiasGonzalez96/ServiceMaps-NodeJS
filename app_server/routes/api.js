var express = require('express');
var router = express.Router();

const ctrlServicios = require('../controllers/serviciosAPI');
const ctrlComentarios = require('../controllers/comentariosAPI');

//Servicios
router.get('/servicios', ctrlServicios.getServicios);

//Comentarios 
router.get('/servicios/comentarios/:id', ctrlComentarios.obtenerComentarios); 
router.post('/servicios/comentarios/:id', ctrlComentarios.crearComentario);

module.exports = router;