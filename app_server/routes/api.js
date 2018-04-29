var express = require('express');
var router = express.Router();
const servicioApi = require('../controllers/servicioApi');

/* GET home page. */
router.get('/servicios', servicioApi.getServicios);
module.exports = router;