var errorPages  = require('./src/qes/error');
var path        = require('path');
var http        = require('http');
var logger      = require('./src/logger');  

// Create the express app
var app     = require('./src/app');

// Access logging
app.use(logger.access);

// Create your routes
require('./src/register-routes')(app);

// Error logging
app.use(logger.error);

// Error pages
app.use(errorPages({
    debug: true,
    debugParam: 'wtf'
}));