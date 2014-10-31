var express 	= require('express');
var engines		= require('consolidate');
var path		= require('path');
var http		= require('http');

var app = express();
app.engine('hbs', engines.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.set('env', 'production');
app.enable('view cache');
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, '../static')));

app.server = http.createServer(app);

app.server.listen(8000);

app.use(express.query());

module.exports = app;