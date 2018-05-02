var express = require('express');
var router = express.Router();
const servicioApi = require('../controllers/servicioApi');

router.get('/servicios', servicioApi.getServicios);

module.exports = router;