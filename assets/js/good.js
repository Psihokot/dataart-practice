var counter = require('./basketCount');

module.exports = function() {
    var basketCounter = localStorage.getItem('basketCounter'),
        goodView = JSON.parse(localStorage.getItem('good#' + localStorage.getItem('elementId'))),
        localCounter = goodView.numberOf;

    $(".buy_button").on("click", function () {
        ++basketCounter;
        ++localCounter;
        localStorage.setItem('basketCounter', basketCounter);
        counter();
        goodView.numberOf = localCounter;
        localStorage.setItem('good#' + localStorage.getItem('elementId'), JSON.stringify(goodView));
    });
};