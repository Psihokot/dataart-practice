$(function() {
    var countPrice = function(price, target, counter) {
        var costOf = parseInt(price) * counter;
        var changedElement = $(target).parent().nextAll(".table_col_cost").children("input");
        
        $(changedElement).attr("value", costOf);
    };
    
    var countTotalNumberof = function() {
        var arr = $(".main_content_table > tbody").find(".table_col_numberof");
        var totalCounter = 0;
        // console.log(arr);

        for (var i = 0; i < arr.length; i++) {
            totalCounter = totalCounter + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_numberof").attr("value", totalCounter);
    };

    var countTotalPrice = function() {
        var arr = $(".main_content_table > tbody").find(".table_col_cost");
        var totalPrice = 0;
        console.log(arr);

        for (var i = 0; i < arr.length; i++) {
            totalPrice = totalPrice + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_price").attr("value", totalPrice);
    };

    countTotalNumberof();
    countTotalPrice();

    $(".del_row_icon").on("click", function(event) {
        var target = event.target;
        var totalCounterMinus = $(target).parent().prevAll(".table_col_numberof").children("input").attr("value");

        $(target).parent().parent().remove();
        countTotalNumberof();
        countTotalPrice();
    });

    $(".table_numberof_minus").on("click", function(event) {
        var target = event.target;
        var counter = $(target).next().attr("value");
        var price = $(target).parent().prevAll(".table_col_price").html();

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
        var target = event.target;
        var counter = $(target).prev().attr("value");
        var price = $(target).parent().prevAll(".table_col_price").html();
        
        ++counter;
        $(target).prev().attr("value", counter);
        countPrice(price, target, counter);
        countTotalNumberof();
        countTotalPrice();
    });

    
    
});

