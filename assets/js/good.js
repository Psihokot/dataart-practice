//var counter = require('./basketCount');

module.exports = {

  //counter : require('./basketCount'),

  goodModel: require('./models/goodModel.js'),

  init: function(){

    var self= this;

      $(".buy_button").on("click", function () {

        self.goodModel.addToBasket();

        /*var basketCounter = localStorage.getItem('basketCounter'),
          goodView = JSON.parse(localStorage.getItem('good#' + localStorage.getItem('elementId'))),
          localCounter = goodView.numberOf;

          ++basketCounter;
          ++localCounter;
          localStorage.setItem('basketCounter', basketCounter);
          this.counter();
          goodView.numberOf = localCounter;
          localStorage.setItem('good#' + localStorage.getItem('elementId'), JSON.stringify(goodView));*/
      });
    }

};