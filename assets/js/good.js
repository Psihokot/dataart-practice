module.exports = function() {
    $(function () {
        var basketCounter = 0;
        $(".buy_button").on("click", function () {
            var basketFinalWord = '';

            ++basketCounter;
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
        });
    });
};