var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

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
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */
app.listen(app.get('port'));
