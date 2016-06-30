var notify = require('notify'),
    datetimepicker = require('bootstrap-datetimepicker/js/bootstrap-datetimepicker'),

    MESSAGES = {
        success: "Ваш заказ успешно оформлен",
        requiredError: "Не все обязательные поля заполнены",
        emailError: "Некорректный Email"
    };

module.exports = {

    basketCount : require('./utils/basketCount'),
    basketModel: require('./models/basketModel'),

    errorNull: true,
    errorEmail: true,

    init: function(){
        var self = this;

        $('#datetimepicker').datetimepicker({
            format: 'mm/dd/yyyy',
            pickTime: 'false',
            language: 'ru'
        });

        $("#send").click(function() {

            var isError = self.checkNull($("#inputName")) ||
                        self.checkEmail($("#inputEmail")) ||
                        self.checkNull($("#inputAdress"));

            if (!isError) {
                $(".order_form").attr("style", "display: none");
                $(".main_content_header").after("<h2>"+ MESSAGES.success +"</h2>");
                self.basketModel.clear();
                this.basketCount();
            }
        });
    },

    checkNull: function(el) {

        var isError;
        
        el.val(el.val().trim());

        if (el.val() == "") {
            $("#send").notify(MESSAGES.requiredError, {
                    className: "error",
                    position: "right"
                }
            );
            el.addClass("errtextbox");

            isError = true;
        } else {
            el.removeClass("errtextbox");

            isError = false;
        }

        return isError;
    },

    checkEmail: function(el) {
        var value = el.val().trim(),
            isError;

        if (value.search(/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,6}$/i) != 0) {
            $("#send").notify(MESSAGES.emailError, {
                className: "error",
                position: "right"
            });
            el.addClass("errtextbox");
            isError = true;
        } else {
            isError = false;
            el.removeClass("errtextbox");
        }

        return isError;
    }


};
