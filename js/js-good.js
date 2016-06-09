$(function() {
    var busketCounter = 0;
    $(".buy_button").on("click", function() {
        var busketLink = $(".header_personal_basket > span");
        var busketLinkText = 'В вашей корзине';
        var busketFinalWord = ' товаров';

        ++busketCounter;
        $(busketLink).html(function() {
            switch (busketCounter) {
                case 1:
                    busketFinalWord = ' товар';
                    break;
                case 2:
                case 3:
                case 4:
                    busketFinalWord = ' товара';
                    break;
                default:
                    busketFinalWord = ' товаров';
                    break;
            }
            var busketLinkHtml = '<a href=busket.html>' + busketLinkText + ' ' + busketCounter + busketFinalWord + '</a>';
            return busketLinkHtml;
        });
    });
});
