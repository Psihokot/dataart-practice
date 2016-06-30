module.exports = {
    
    goodModel: require('./models/goodModel.js'),
    
    init: function(){
    
        var self= this;
      
        $(".buy_button").on("click", function () {
    
          self.goodModel.addToBasket();
        });
      }

};