/* GET home page. */
const comentarios = function (req, res) { 
  res.render('comentarios', { title: 'Comentarios' });
};

module.exports = { comentarios }