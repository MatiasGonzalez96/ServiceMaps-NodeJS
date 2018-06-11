const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');
const User = mongoose.model('User');

/* GET index page. */
const index = function (req, res) {
  Servicio
    .find()
    .exec((err, servicios) => {
      if (err)
      {
        res.render('error', { error : err });
      }
      else
      {
          if (req.user)
          {
              User.findOne({'_id': req.user._id}).exec((err, usuario) => {
                  res.render('index', {
                    title: 'Service Maps',
                    servicios: servicios,
                    user: usuario
                  });
              })
          }
          else
          {
              res.render('index', {
                title: 'Service Maps',
                servicios: servicios,
                user: req.user
              });
          }

      }
    })
};

/* GET Servicios page. */
const servicios = function(req, res)
{
  Servicio.findOne({ 'id': req.params.id }).exec((err, servicio) => {
      if (err) {
        res.render('error',{error : err});
      } else {
        res.render('servicios', {
          title: 'Servicios',
          servicio: servicio
        });
      }
    })
};

/* GET Comentarios page. */
const comentarios = function(req, res)
{
  Servicio.findOne({ 'id': req.params.id }).exec((err, servicio) => {
      if (err) {
        res.render('error',{error : err});
      } else {
        res.render('comentarios', {
          title: 'Comentarios',
          servicio: servicio
        });
      }
    })
};

module.exports = { index, servicios, comentarios }
