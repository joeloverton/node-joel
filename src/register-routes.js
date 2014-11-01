var Q = require('q');
var respire = require('respire');

module.exports = function (app) {
    app.use(respire);
    app.get('/', renderUserPage);
    app.get('/json', renderSomeData);
};

function renderUserPage(req, res, next) {
    req.process(getUserData)                // Get a bunch of template keys
        .then(respire.demand('userData'))   // Make sure the 'userData' key is set
        .then(res.renderInto('users'))      // Render the users page
        .then(res.renderInto('chrome'))     // Place the users page inside the page template
        .then(res.respond.withHTML)         // Serve the page to the user
        .catch(next)                        // Throw to the error middleware on error
        .done();                            // Humour Q
}

function renderSomeData(req, res, next) {
    Q({
        one: '1',
        two: '2',
        three: '3',
        four: '5',
        five: '8'
    })
        .then(res.renderInto(JSON.stringify))
        .then(res.respond.withJSON)
        .catch(next).done();
}

function getUserData(req) {
    var notFound = new Error('Not found');
    notFound.statusCode = 404;
    return {
        'userData': 'Bob'
        // 'userData': Q.reject(notFound)
    };
}