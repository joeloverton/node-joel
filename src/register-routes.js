var Q = require('q');

module.exports = function (app) {
	app.get('/', page(homePage));
};

function homePage () {
	return Q({content: "<p>hello world.</p>", data: {}});
}

function page (contentFunc) {
	return function (req, res, next) {
		res.pageContent = contentFunc(req);
		next('route');
	}
}

