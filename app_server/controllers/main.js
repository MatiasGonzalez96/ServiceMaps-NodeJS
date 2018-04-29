const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');

/* GET home page. */
const index = function (req, res) { 
  Servicio
    .find()
    .exec((err, servicios) => {
      if (err) { 
        res.render('error', { error : err });    
      } else {
        res.render('index', {
          title: 'Service Maps', 
          servicios: servicios 
        });
      }
    })
};

module.exports = { index }