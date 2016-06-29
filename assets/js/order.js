var notify = require('notify'),
    datetimepicker = require('bootstrap-datetimepicker/js/bootstrap-datetimepicker'),

    MESSAGES = {
        success: "Ваш заказ успешно оформлен",
        commonError: "Форма заполнена некорректно",
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

        $("#inputName").submit(this.checkNull);
        $("#inputAdress").submit(this.checkNull);
        $("#inputEmail").submit(this.checkEmail);

        $("#send").click(function() {
            $("#inputAdress").trigger("submit");
            $("#inputEmail").trigger("submit");
            $("#inputName").trigger("submit");
            console.log(this.errorNull);
            console.log(this.errorEmail);
            if (!(self.errorNull || self.errorEmail)) {

                $(".order_form").attr("style", "display: none");
                $(".main_content_header").after("<h2>"+ MESSAGES.success +"</h2>");
                self.basketModel.clear();
                this.basketCount();

            } else {

                $(this).notify(MESSAGES.commonError, {
                    className: "error",
                    position: "right"
                });
            }
        });
    },

    checkNull: function() {
        $(this).val($(this).val().trim());

        if ($(this).val() == "") {
            $("#send").notify(MESSAGES.requiredError, {
                    className: "error",
                    position: "right"
                }
            );
            $(this).addClass("errtextbox");
            this.errorNull = true; //this - это объект jQuery
        } else {
            this.errorNull = false; //this - это объект jQuery
            $(this).removeClass("errtextbox");
        }
    },

    checkEmail: function() {
        var value = $(this).val().trim();

        if (value.search(/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,6}$/i) != 0) {
            $("#send").notify(MESSAGES.emailError, {
                className: "error",
                position: "right"
            });
            $(this).addClass("errtextbox");
            this.errorEmail = true; //this - это объект jQuery
        } else {
            this.errorEmail = false; //this - это объект jQuery
            $(this).removeClass("errtextbox");
        }
    }


};
