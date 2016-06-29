var notify = require('notify'),
    datetimepicker = require('bootstrap-datetimepicker/js/bootstrap-datetimepicker'),
    basketCount = require('./basketCount');

module.exports = function() {
    $('#datetimepicker').datetimepicker({
        format: 'mm/dd/yyyy',
        pickTime: 'false',
        language: 'ru'
    });

    var errorNull = true,
        errorEmail = true;

    function checkNull() {
        $(this).val($(this).val().trim());

        if ($(this).val() == "") {
            $("#send").notify("Не все обязательные поля заполнены", {
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
    }

    function checkEmail() {
        var value = $(this).val().trim();

        if (value.search(/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,6}$/i) != 0) {
            $("#send").notify("Некорректный Email", {
                className: "error",
                position: "right"
            });
            $(this).addClass("errtextbox");
            errorEmail = true;
        } else {
            errorEmail = false;
            $(this).removeClass("errtextbox");
        }
    }

    $("#inputName").submit(checkNull);
    $("#inputAdress").submit(checkNull);
    $("#inputEmail").submit(checkEmail);

    $("#send").click(function() {
        $("#inputAdress").trigger("submit");
        $("#inputEmail").trigger("submit");
        $("#inputName").trigger("submit");

        if (!(errorNull || errorEmail)) {

            $(".order_form").attr("style", "display: none");

            // setTimeout(function() {
            //     $("#regForm").removeAttr("onsubmit");
            //     $("#regForm").submit();
            // }, 2000
            // );

            $(".main_content_header").after("<h2>Ваш заказ успешно оформлен</h2>");
            localStorage.clear();
            basketCount();
        } else {
            $(this).notify("Форма заполнена некорректно", {
                className: "error",
                position: "right"
            });
        }
    });
};
