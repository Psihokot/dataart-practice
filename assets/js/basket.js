var basketCount = require('./basketCount');

module.exports = function() {
    var basketCounter = localStorage.getItem('basketCounter'),
        goodsView = {};

    if (basketCounter == 0) {
        $(".main_content > form").html("Корзина пуста");
        $(".main_content > a").remove();
    }

    function countPriceFirst() {
        var base = $(".main_content_table > tbody"),
            priceArr = base.find(".table_col_price"),
            numberofArr = base.find(".table_col_numberof"),
            totalPrice = base.find(".table_col_cost");

        for (var i = 0; i < priceArr.length; i++) {
            currentPrice = $($(priceArr[i])).html().replace(/\s+/g, '').slice(0, -2) * parseInt($($(numberofArr)[i]).children("input").attr("value"));
            $($(totalPrice)[i]).children("input").attr("value", currentPrice);
        }
    }

    function countPrice(target, counter) {
        var price = $(target).parent().prevAll(".table_col_price").html().replace(/\s+/g, '').slice(0, -2),
            costOf = parseInt(price) * counter,
            changedElement = $(target).parent().nextAll(".table_col_cost").children("input"),
            targetId = $(target).parent().prevAll(".table_col_art").html(),
            localStorageItem = JSON.parse(localStorage.getItem('good#' + targetId));

        localStorageItem.numberOf = counter;
        localStorage.setItem("good#" + targetId, JSON.stringify(localStorageItem));

        $(changedElement).attr("value", costOf);
        localStorage.setItem('basketCounter', basketCounter);
        countTotalNumberof();
        countTotalPrice();
        basketCount();
    }

    function countTotalNumberof() {
        var arr = $(".main_content_table > tbody").find(".table_col_numberof"),
            totalCounter = 0;

        for (var i = 0; i < arr.length; i++) {
            totalCounter = totalCounter + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_numberof").attr("value", totalCounter);
    }

    function countTotalPrice() {
        var arr = $(".main_content_table > tbody").find(".table_col_cost"),
            totalPrice = 0;

        for (var i = 0; i < arr.length; i++) {
            totalPrice = totalPrice + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_price").attr("value", totalPrice);
    }

    countPriceFirst();
    goodsView.goods = [];
    countTotalNumberof();
    countTotalPrice();

    $(".del_row_icon").on("click", function (event) {
        var target = event.target,
            targetId = $(target).parent().prevAll(".table_col_art").html(),
            totalCounterMinus = $(target).parent().prevAll(".table_col_numberof").children("input").attr("value");

        $(target).parent().parent().remove();
        basketCounter = basketCounter - totalCounterMinus;
        localStorage.setItem('basketCounter', basketCounter);
        countTotalNumberof();
        countTotalPrice();
        basketCount();
        localStorage.removeItem("good#" + targetId);
    });

    $(".table_numberof_minus").on("click", function (event) {
        var target = event.target,
            counter = $(target).next().attr("value");

        if (counter == 0) {
            return
        } else {
            --counter;
            --basketCounter;
        }

        $(target).next().attr("value", counter);
        countPrice(target, counter);
    });

    $(".table_numberof_plus").on("click", function (event) {
        var target = event.target,
            counter = $(target).prev().attr("value");

        ++counter;
        ++basketCounter;
        $(target).prev().attr("value", counter);
        countPrice(target, counter);
    });
};

