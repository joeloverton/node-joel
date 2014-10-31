var nes 	= require('node-express-shorthand');
var path 	= require('path');
var http 	= require('http');
var logger  = require('./src/logger');	

// Create the express app
var app 	= require('./src/app');

// Access logging
app.use(logger.access);

// Add the node-express-shorthand APIs
nes.middleware.addAPIs(app);

// Create your routes
require('./src/register-routes')(app);

// Add the middleware that wraps res.pageContent in res.pageTemplate
app.use(require('./src/middleware/page-renderer')());

// Add the middleware that serves responses and error pages
nes.middleware.add(app, {
    debug: true,
    errorDir: 'errors',
    rethrowErrors: true
});

// Error logging
app.use(logger.error);

app.use(function (err, req, res, next) { /* Don't have a cow, man. */ });