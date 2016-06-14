$(function() {
    var basketCounter = 0;
    $(".buy_button").on("click", function() {
        var basketFinalWord = '';

        ++basketCounter;
        $(".basket_link > span").text(function() {
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
    
    // $(".thumbnail").on("click", function(event) {
    //     var target = event.target;
    //
    //     $(target).parents(".item").addClass("active");
    //     console.log($(target).parents(".item"));
    // });
});
