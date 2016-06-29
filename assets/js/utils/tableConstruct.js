module.exports = {

    goodsView: {},

    getGoodsView: function() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i),
                value = localStorage[key];

            if (key.indexOf('good') == 0) {
                var elem = JSON.parse(value);
                if (elem.numberOf != 0) {
                    this.goodsView.goods.push(elem);
                }
            }
        }
    },

    constructBasketTemplate: function(template) {
        return Mustache.render(template, this.goodsView);
    },

    implement: function(template){

        var basketCounter = localStorage.getItem('basketCounter');

        this.goodsView.goods = [];
        this.getGoodsView();
        return this.constructBasketTemplate(template);
    }

};
