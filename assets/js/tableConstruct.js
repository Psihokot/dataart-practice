module.exports = function(template) {
    var goodsView = {};
    
    function getGoodsView() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i),
                value = localStorage[key];


            if (key.indexOf('good') == 0) {
                goodsView.goods.push(JSON.parse(value));
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
