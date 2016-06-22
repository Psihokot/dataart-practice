$(function() {
    $(".fancybox").fancybox(
        {arrows: false}
    );

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

    var countPrice = function(price, target, counter) {
            var costOf = parseInt(price) * counter,
                changedElement = $(target).parent().nextAll(".table_col_cost").children("input");

            $(changedElement).attr("value", costOf);
        },

        countTotalNumberof = function() {
            var arr = $(".main_content_table > tbody").find(".table_col_numberof"),
                totalCounter = 0;

            for (var i = 0; i < arr.length; i++) {
                totalCounter = totalCounter + parseInt($($(arr)[i]).children("input").attr("value"));
            }
            $(".total_numberof").attr("value", totalCounter);
        },

        countTotalPrice = function() {
            var arr = $(".main_content_table > tbody").find(".table_col_cost"),
                totalPrice = 0;

            for (var i = 0; i < arr.length; i++) {
                totalPrice = totalPrice + parseInt($($(arr)[i]).children("input").attr("value"));
            }
            $(".total_price").attr("value", totalPrice);
        };

    countTotalNumberof();
    countTotalPrice();

    $(".del_row_icon").on("click", function(event) {
        var target = event.target,
            totalCounterMinus = $(target).parent().prevAll(".table_col_numberof").children("input").attr("value");

        $(target).parent().parent().remove();
        countTotalNumberof();
        countTotalPrice();
    });

    $(".table_numberof_minus").on("click", function(event) {
        var target = event.target,
            counter = $(target).next().attr("value"),
            price = $(target).parent().prevAll(".table_col_price").html();

        if (counter == 0) {
            return
        } else {
            --counter;
        }

        $(target).next().attr("value", counter);
        countPrice(price, target, counter);
        countTotalNumberof();
        countTotalPrice();
    });

    $(".table_numberof_plus").on("click", function(event) {
        var target = event.target,
            counter = $(target).prev().attr("value"),
            price = $(target).parent().prevAll(".table_col_price").html();

        ++counter;
        $(target).prev().attr("value", counter);
        countPrice(price, target, counter);
        countTotalNumberof();
        countTotalPrice();
    });

    $('#datetimepicker1').datetimepicker(
        {pickTime: false, language: 'ru'}
    );

    var errorNull = true, errorEmail = true;

    var checkNull =function() {
        $(this).val($(this).val().trim());

        if ($(this).val() == "") {
            $(this).notify("Поле незаполнено", {
                    className: "error",
                    position: "right"
                }
            );
            $(this).addClass("errtextbox");
            errorNull = true;
        } else {
            errorNull = false;
            $(this).removeClass("errtextbox");
        }
    };

    $("#inputName").focusout(checkNull);
    $("#inputAdress").focusout(checkNull);
    $("#inputDate").focusout(checkNull);

    $("#inputEmail").focusout(function() {
        var value = $(this).val().trim();

        if (value.search(/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,6}$/i) != 0) {
            $(this).notify("Некорректный Email", {
                className: "error",
                position: "right"
            });
            $(this).addClass("errtextbox");
            errorEmail = true;
        } else {
            errorEmail = false;
        }
    });

    $("#send").click(function() {
        if (!(errorNull || errorEmail)) {
            $("#regForm").submit();
        } else {
            $(this).notify("Форма заполнена некорректно", {
                className: "error",
                position: "right"
            });
        }
    });
});
