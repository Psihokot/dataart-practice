
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
    }
};
