//var basketCount = require('./basketCount');

module.exports = {

    basketModel: require('./models/basketModel'),

    basketCount: require('./utils/basketCount'),

    //basketCounter: "",

    init: function(){

        var self = this,
            goodsView = {};

          //this.basketCounter = localStorage.getItem('basketCounter');
          //this.basketCounter = this.basketModel.basketCounter;

        if (this.basketModel.basketCounter == 0) {
            $(".main_content > form").html("<h1>Корзина пуста</h1>");
            $(".main_content > a").remove();
        }

        this.countPriceFirst();
        goodsView.goods = [];
        this.countTotalNumberof();
        this.countTotalPrice();

        $(".del_row_icon").on("click", function (event) {

            var target = event.target,
                targetId = $(target).parent().prevAll(".table_col_art").html(),
                totalCounterMinus = $(target).parent().prevAll(".table_col_numberof").children("input").attr("value");
            
            $(target).parent().parent().remove();
            self.basketModel.basketCounter = self.basketModel.basketCounter - totalCounterMinus;
            self.countTotalNumberof();
            self.countTotalPrice();

            self.basketModel.removeGood(targetId);
            self.basketCount();

            /*var target = event.target,
              targetId = $(target).parent().prevAll(".table_col_art").html(),
              totalCounterMinus = $(target).parent().prevAll(".table_col_numberof").children("input").attr("value");

            $(target).parent().parent().remove();
            self.basketCounter = self.basketCounter - totalCounterMinus;
            localStorage.setItem('basketCounter', self.basketCounter);
            self.countTotalNumberof();
            self.countTotalPrice();
            self.basketCount();
            localStorage.removeItem("good#" + targetId);*/
        });

        $(".table_numberof_minus").on("click", function (event) {
            var target = event.target,
              counter = $(target).next().attr("value");

            if (counter == 0) {
                return
            } else {
                --counter;
                //--self.basketCounter;
                --self.basketModel.basketCounter;
            }

            $(target).next().attr("value", counter);
            self.countPrice(target, counter);
        });

        $(".table_numberof_plus").on("click", function (event) {
            var target = event.target,
              counter = $(target).prev().attr("value");

            ++counter;
            //++self.basketCounter;
            ++self.basketModel.basketCounter;

            $(target).prev().attr("value", counter);
            self.countPrice(target, counter);
        });
    },

    countPriceFirst: function() {
        var base = $(".main_content_table > tbody"),
            priceArr = base.find(".table_col_price"),
            numberofArr = base.find(".table_col_numberof"),
            totalPrice = base.find(".table_col_cost");

        for (var i = 0; i < priceArr.length; i++) {
            var currentPrice = $($(priceArr[i])).html().replace(/\s+/g, '').slice(0, -2) * parseInt($($(numberofArr)[i]).children("input").attr("value"));
            $($(totalPrice)[i]).children("input").attr("value", currentPrice);
        }
    },

    countPrice: function(target, counter) {
        var price = $(target).parent().prevAll(".table_col_price").html().replace(/\s+/g, '').slice(0, -2),
            costOf = parseInt(price) * counter,
            changedElement = $(target).parent().nextAll(".table_col_cost").children("input"),
            targetId = $(target).parent().prevAll(".table_col_art").html();
            //localStorageItem = JSON.parse(localStorage.getItem('good#' + targetId));

        //localStorage.setItem('basketCounter', self.basketCounter);

        //localStorageItem.numberOf = counter;
        //localStorage.setItem("good#" + targetId, JSON.stringify(localStorageItem));

        this.basketModel.changeQnty(targetId, counter);

        $(changedElement).attr("value", costOf);

        this.countTotalNumberof();
        this.countTotalPrice();
        this.basketCount();
    },

    countTotalNumberof: function() {
        var arr = $(".main_content_table > tbody").find(".table_col_numberof"),
            totalCounter = 0;

        for (var i = 0; i < arr.length; i++) {
            totalCounter = totalCounter + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_numberof").attr("value", totalCounter);
    },

    countTotalPrice: function() {
        var arr = $(".main_content_table > tbody").find(".table_col_cost"),
            totalPrice = 0;

        for (var i = 0; i < arr.length; i++) {
            totalPrice = totalPrice + parseInt($($(arr)[i]).children("input").attr("value"));
        }
        $(".total_price").attr("value", totalPrice);
    }


};

