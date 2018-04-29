/* GET home page. */
const servicios = function (req, res) { 
  res.render('servicios', { title: 'Servicios' });
};

module.exports = {
  servicios
}