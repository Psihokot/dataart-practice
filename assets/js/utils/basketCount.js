module.exports = function() {
    var basketFinalWord = '';
    
    if (!(localStorage.getItem('basketCounter')) || localStorage.getItem('basketCounter') == 0) {
        localStorage.setItem('basketCounter', 0);
    }

    var basketCounter = localStorage.getItem('basketCounter');

    function setBasketCounter() {
        $(".basket_link > span").text(function () {
            switch (basketCounter) {
                case "0":
                    basketFinalWord = ' пусто';
                    return basketFinalWord;
                case "1":
                    basketFinalWord = ' товар';
                    break;
                case "2":
                case "3":
                case "4":
                    basketFinalWord = ' товара';
                    break;
                default:
                    basketFinalWord = ' товаров';
                    break;
            }
            return (basketCounter + basketFinalWord);
        });

        if (basketCounter == 0) {
            $(".basket_link").addClass("disabled");
        } else {
            $(".basket_link").removeClass("disabled");
        }

    }
    setBasketCounter();

    if (basketCounter == 0) {
        $(".main_content > form").html("<h1>Корзина пуста</h1>");
        $(".main_content > a").remove();
    }
};