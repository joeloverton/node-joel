var Q = require('q');
var _ = require('lodash');
var render = require('./render');
var path = require('path');


module.exports = respondTo;

function respondTo (reqOrRes) {

    var res = reqOrRes.res || reqOrRes;
    var req = res.req;

    var respond  = {

        withJSON: function withJSON (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
            return res;
        },

        withHTML: function withHTML (html, statusCode) {
            res.setHeader('Content-Type', 'text/html');
            res.send(statusCode || 200, html.toString());
            return res;
        },

        withError: function (err) {
            res.send(err.statusCode || 500, '<pre>'+err.stack+'</pre>');
        },

        withErrorPageFrom: function (errorTemplateDir, err ) {
            var errCode = err.statusCode || 500;
            var fields = {
                code: errCode,
                message: err.message
            };

            return render(path.join(errorTemplateDir, errCode+''), res, fields)
                .fail(function () {
                    return render(path.join(errorTemplateDir, Math.floor(errCode / 100) + 'xx'), res, fields);
                })
                .then(function (html) {
                    return respond.withHTML(html, errCode);
                })
                .fail(respond.withError);

        }
    };

    return respond;
}
