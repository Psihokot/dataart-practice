
module.exports = {

    goods: [],
    
    fetch: function(router){
    
        var self = this;
        
        $.ajax({
            type: "GET",
            url: "../assets/data/goods.json",
            dataType: "json",
            success: function(data) {
            self.goods = data;
            //callback();
            router.loadPage();
            }
        });
    },
    
    counter : require('../utils/basketCount'),
    
    addToBasket: function(){
    
        var basketCounter = localStorage.getItem('basketCounter'),
          goodView = JSON.parse(localStorage.getItem('good#' + localStorage.getItem('elementId'))),
          localCounter = goodView.numberOf;
        
        ++basketCounter;
        ++localCounter;
        localStorage.setItem('basketCounter', basketCounter);
        this.counter();
        goodView.numberOf = localCounter;
        localStorage.setItem('good#' + localStorage.getItem('elementId'), JSON.stringify(goodView));
    },

    setGood: function(goodView){
        localStorage.setItem('elementId', goodView.id);
        localStorage.setItem('good#' + goodView.id, JSON.stringify(goodView));
    },

    getGoodsView: function(){
        var goodId = this.getGoodID() - 1,
            goodView;

        if (localStorage.getItem('good#' + this.getGoodID())) {
            goodView = JSON.parse(localStorage.getItem('good#' + this.getGoodID()));
        } else {
            goodView = this.goods[goodId];
            goodView.numberOf = "0";
        }

        return goodView
    },

    getGoodID: function() {
        var hash = location.hash;

        return hash.substring(hash.indexOf("/") + 1);
    }
};
