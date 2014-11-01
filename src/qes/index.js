var Q = require('q');
var QC  = require('q-combinators');
var _   = require('lodash');
var render = require('./render');
var respondTo = require('./respond-to');

module.exports = qes;

var api = {
    demand: function () {
        var keys = [].slice.call(arguments);
        return function (objectOfPromises) {
            return QC.object.demand(keys, objectOfPromises)
                .then(function () {
                    return QC.object.fulfilled(objectOfPromises);
                }, function (failures) {
                    var messages = _.map(failures, getMessage);
                    var error = new Error(JSON.stringify(_.zipObject(_.keys(failures), messages)));
                    error.statusCode = _(failures).values().pluck('statusCode').compact().union(500).min();
                    throw error;
                });
        }
    }   
};

function qes (req, res, next) {
    req.process = function (fn) {
        return Q.fcall(fn, req, res);
    };
    res.renderInto = renderInto;
    res.respond = respondTo(req);
    _.extend(res, api);
    next();
}

function renderInto (template) {
    return _.partial(render, template, this);       
}

function getMessage (error) {
    return '(' + (error.statusCode || '?') + '): ' + error.message;
}



