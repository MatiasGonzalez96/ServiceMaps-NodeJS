const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  sitioweb: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    required: true
  },
  longitud: {
    type: Number,
    required: true
  },
});

mongoose.model('Servicio', servicioSchema);