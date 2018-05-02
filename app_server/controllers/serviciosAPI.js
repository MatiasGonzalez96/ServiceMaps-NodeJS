const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');

const getServicios = function (req, res) {
  Servicio
    .find()
    .exec((err, servicios) => {
      if (err) { 
        res.status(404).json(err);    
      } else {
        res.status(200).json(servicios);
      }
    })
}

module.exports = { getServicios };