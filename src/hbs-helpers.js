module.exports = function (hbs) {
    hbs.registerHelper('stringify', function (value) {
        return JSON.stringify(value);
    });
}