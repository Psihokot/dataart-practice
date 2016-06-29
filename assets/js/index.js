var bootstrap = require('bootstrap-3.3.5-dist/js/bootstrap'),
    fancyBox = require('fancyBox/source/jquery.fancybox');

module.exports = {
    init: function() {
        $(".fancybox").fancybox(
          {arrows: false}
        );
    }
};