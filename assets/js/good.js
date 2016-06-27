module.exports = function() {
    var basketCounter = localStorage.getItem('basketCounter');

    if (localStorage.getItem('good#' + localStorage.getItem('elementId'))) {
        var localCounter = localStorage.getItem('good#' + localStorage.getItem('elementId'));
    } else {
        localCounter = 0;
    }

    $(".buy_button").on("click", function () {
        var basketFinalWord = '';

        function setBasketCounter() {
            $(".basket_link > span").text(function () {
                switch (basketCounter) {
                    case 1:
                        basketFinalWord = ' товар';
                        break;
                    case 2:
                    case 3:
                    case 4:
                        basketFinalWord = ' товара';
                        break;
                    default:
                        basketFinalWord = ' товаров';
                        break;
                }
                return (basketCounter + basketFinalWord);
            });
            $(".basket_link").removeClass("disabled");
        }

        ++basketCounter;
        ++localCounter;
        localStorage.setItem('basketCounter', basketCounter);
        localStorage.setItem('good#' + localStorage.getItem('elementId'), localCounter);
        setBasketCounter();
    });
};