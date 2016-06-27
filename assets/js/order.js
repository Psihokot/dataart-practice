var notify = require('notify'),
    datetimepicker = require('bootstrap-datetimepicker/js/bootstrap-datetimepicker');

module.exports = function() {
    $('#datetimepicker').datetimepicker({
        format: 'mm/dd/yyyy',
        pickTime: 'false',
        language: 'ru'
    });

    var errorNull = true,
        errorEmail = true,
        errorLog = {};

    function checkNull() {
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
    }

    function checkEmail() {
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
    }

    $("#inputName").focusout(checkNull);
    $("#inputAdress").focusout(checkNull);
    $("#inputDate").focusout(checkNull);
    $("#inputEmail").focusout(checkEmail);

    $("#send").click(function () {
        if (!(errorNull || errorEmail)) {
            $("#regForm").submit();
        } else {
            $(this).notify("Форма заполнена некорректно", {
                className: "error",
                position: "right"
            });
            $("#inputName").trigger("focusout");
            $("#inputAdress").trigger("focusout");
            $("#inputDate").trigger("focusout");
            $("#inputEmail").trigger("focusout");
        }
    });
};
