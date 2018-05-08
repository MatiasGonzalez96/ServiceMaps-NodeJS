const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');

const setComentario = function(req,res)
{
    console.log("ID: "+req.body.id);
    console.log("COMENTARIO: "+req.body.comentario);
    console.log("USUARIO: "+ req.body.usuario);
    console.log("FECHA: "+ req.body.fecha);

    Servicio.update({'id': req.body.id},{ "$push": { "comentarios": { "usuario" :  req.body.usuario, "comentario" : req.body.comentario}}},
        {upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Comentario Agregado");
                res
                    .status(201)
                    .json(comentario);
            }
        })
}

module.exports = {
	setComentario
};
