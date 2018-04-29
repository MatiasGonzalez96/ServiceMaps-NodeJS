/* GET home page. */
const index = function (req, res) { 
  res.render('index', { title: 'Service Maps' });
};

module.exports = {
  index
}