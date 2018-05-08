const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  }
});

mongoose.model('Tema', temaSchema);
