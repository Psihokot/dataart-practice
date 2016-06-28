module.exports = function() {
    var basketFinalWord = '';
    
    if (!(localStorage.getItem('basketCounter')) || localStorage.getItem('basketCounter') == 0) {
        localStorage.setItem('basketCounter', 0);
        return;
    }

    var basketCounter = localStorage.getItem('basketCounter');

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
    setBasketCounter();
};