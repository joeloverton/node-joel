var Q = require('q');
var qes = require('./qes');

module.exports = function (app) {
    app.get('/', qes, renderUserPage);
};

function renderUserPage(req, res, next) {
    req.process(getUserData)            // Get a bunch of template keys
        .then(res.demand('userData'))   // Make sure the 'userData' key is set
        .then(res.renderInto('users'))  // Render the users page
        .then(res.renderInto('chrome')) // Place the users page inside the page template
        .then(res.respond.withHTML)     // Serve the page to the user
        .fail(next)                     // Throw to the error middleware on error
        .done();                        // Humour Q
}

function getUserData(req) {
    var notFound = new Error('Not found');
    notFound.statusCode = 404;
    return {
        'userData': 'Bob'
        // 'userData': Q.reject(notFound)
    };
}