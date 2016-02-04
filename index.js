var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path'),

  routes = require('./routes'),
  api = require('./routes/api'),
  pdf = require('./routes/pdf');

var app = module.exports = express();
app.set('port', process.env.PORT || 3000);
/**
 * Configuration
 */

// all environments
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(bodyParser.json())
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // app.use(express.errorHandler());
  // mongoose.connect('mongodb://localhost/kollelpgh');
}

// production only
if (env === 'production') {
  // set env variable to production on mac:
  // export NODE_ENV=production

  // set env variable to production on windows:
  // set NODE_ENV=production
  // mongoose.connect('mongodb://pcwitz:kollelpgh@ds05378.mongolab.com:52');
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
app.post('/pdf', pdf.download);

//serve index.html for all remaining routes, in order to leave routing up to angular
app.all('/*', function(req, res, next) {
  res.sendfile('index.html', { root: __dirname + '/public' });
});

// update express, then use this:
// var options = {
//   root: __dirname + '/public/'
// };  

// app.all('/*', function(req, res, next) {
//   res.sendFile('index.html', options, function (err) {
//     if (err) {
//       console.log(err);
//       res.status(err.status).end();
//     }
//     else {
//       console.log('Sent:', 'index.html');
//     }
//   });
// });
/**
 * Start Server
 */
app.listen(app.get('port'));
