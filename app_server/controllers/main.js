const mongoose = require('mongoose');
const Servicio = mongoose.model('Servicio');
var User = require('../models/user');

/* GET index page. */
const index = function (req, res) {
    console.log(req.user);
    Servicio
    .find()
    .exec((err, servicios) => {
      if (err)
      {
        res.render('error', { error : err });
      }
      else
      {
          res.render('index', {
            title: 'Service Maps',
            servicios: servicios,
            user: req.user
          });
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
          servicio: servicio,
          user: req.user
        });
      }
    })
};

/* GET Comentarios page. */
const comentarios = function(req, res)
{
    console.log(req.user);
    Servicio.findOne({ 'id': req.params.id }).exec((err, servicio) => {
    if (err)
    {
      res.render('error',{error : err});
    }
    else
    {
        User.findOne({ 'facebookID': req.user.facebookID }).exec((err, usuario) => {
        if (err)
        {
            res.render('comentarios', {
              title: 'Comentarios',
              servicio: servicio,
              user: req.user
            });
        }
        else
        {
            res.render('comentarios', {
              title: 'Comentarios',
              servicio: servicio,
              user: usuario
            });
        }
    }
    })
};

module.exports = { index, servicios, comentarios }
