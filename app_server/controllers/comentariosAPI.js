const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');

const obtenerComentarios = function(req, res)
{
	Servicio
	.findById(req.params.id)
	.select('comentarios')
	.exec(
		function(err, servicio)
		{
			if(err)
			{
				res.status(404).json(err); 
			}
			else
			{
				if (servicio.comentarios)
				{
					res.status(404).json(servicio.comentarios);
				}				 
			}
		});	
};

const crearComentario = function(req, res)
{
	Servicio
	.findById(req.params.id)
	.select('comentarios')
	.exec(
		function(err, servicio)
		{
			if(err)
			{
				res.status(404).json(err); 
			}
			else
			{
				agregarComentario(req, res, servicio); 
			}
		});	
};

var agregarComentario = function(req, res, servicio)
{
	servicio.comentarios.push({
		usuario: req.body.usuario,
		fecha: req.body.fecha,
		texto: req.body.texto 
	});	
};

module.exports = {
	obtenerComentarios,
	crearComentario
};