
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   // res.render('index');
//   res.sendfile('views/index.html');
// };

// exports.partials = function (req, res) {
//   var name = req.params.name;
//   res.sendfile('views/partials/' + name);
// };


exports.index = function(req, res){
  res.sendfile('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.sendfile('partials/' + name);
};