"use strict";

var Q = require('q');
var _ = require('lodash');

module.exports = function () {
    return pageRendererMiddleware;
};

// Middleware to add support for res.pageContent, which will automatically wrap
// the page content in appropriate page chrome for the current logged in user.
function pageRendererMiddleware (req, res, next) {
    if (res.pageContent && Q.isPromise(res.pageContent)) {
        renderPageContentIntoPageChrome(req, res, next);
    } else {
        next();
    }
}

// Wraps a page with the chrome. Chrome template can be specified on res.pageTemplate
function renderPageContentIntoPageChrome(req, res, next) {
    var pageFields = {};
    res.rendered = res.renderInto(res.pageTemplate || 'chrome').requiring('page')(_.extend({
        page: res.pageContent
    }, pageFields));
    next();
}

