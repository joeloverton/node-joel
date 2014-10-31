var winston = require('winston');
var expressWinston = require('express-winston');

var transports = [new (winston.transports.Console)({json: true})];
module.exports = {
	access: expressWinston.logger({transports: transports}),
	error: expressWinston.errorLogger({transports: transports})
};