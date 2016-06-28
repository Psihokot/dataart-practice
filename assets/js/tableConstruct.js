module.exports = function(template) {
    var goodsView = {},
        basketCounter = localStorage.getItem('basketCounter');
    
    function getGoodsView() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i),
                value = localStorage[key];
            
            if (key.indexOf('good') == 0) {
                var elem = JSON.parse(value);
                if (elem.numberOf != 0) {
                    goodsView.goods.push(elem);
                }
            }
        }
    }

    function constructBasketTemplate(template) {
        return Mustache.render(template, goodsView);
    }

    goodsView.goods = [];
    getGoodsView();
    return constructBasketTemplate(template);
};
