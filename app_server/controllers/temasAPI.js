const mongoose = require('mongoose');
const Tema = mongoose.model('Tema');

const getTema = function (req, res) {
  Tema
    .find()
    .exec((err, tema) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(tema);
      }
    })
}

const setTema = function (req, res) {

    console.log("ID: "+req.body.id);
    console.log("VALOR: "+req.body.valor);

    Tema.update({'id': req.body.id},{ "$set": { 'valor' : req.body.valor}},
      {upsert: true, setDefaultsOnInsert: true}, (err, tema) => {
          if (err) {
              res
                  .status(400)
                  .json(err);
          } else {
              console.log("Se cambio el tema");
              res
                  .status(201)
                  .json(tema);
          }
      })
}

module.exports = {
  getTema,
  setTema
};
