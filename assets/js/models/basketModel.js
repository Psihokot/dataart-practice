
module.exports = {

    basketCounter: localStorage.getItem('basketCounter'),
    
    removeGood : function(targetId){
        localStorage.setItem('basketCounter', this.basketCounter);
        localStorage.removeItem("good#" + targetId);
    },
    
    changeQnty: function(targetId, counter){
        var localStorageItem = JSON.parse(localStorage.getItem('good#' + targetId));
      
        localStorageItem.numberOf = counter;
      
        localStorage.setItem('basketCounter', this.basketCounter);
        localStorage.setItem("good#" + targetId, JSON.stringify(localStorageItem));
    },
    
    clear: function(){
        localStorage.clear();
    }

};
