$(function() {
    $(".del_row_icon").on("click", function(event) {
        var target = event.target;

        $(target).parent().parent().remove();
    });
    
    var totalCounter = $(".total_numberof").attr("value");

    $(".table_numberof_minus").on("click", function(event) {
        var target = event.target;
        var counter = $(target).next().attr("value");

        if (counter == 0) {
            return
        } else {
            --counter;
            --totalCounter;
        }
        $(target).next().attr("value", counter);
        $(".total_numberof").attr("value", totalCounter);
    });

    $(".table_numberof_plus").on("click", function(event) {
        var target = event.target;
        var counter = $(target).prev().attr("value");
        
        ++counter;
        ++totalCounter;
        $(target).prev().attr("value", counter);
        $(".total_numberof").attr("value", totalCounter);
    });



});

