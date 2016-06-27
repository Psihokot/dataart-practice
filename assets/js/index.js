var bootstrap = require('bootstrap-3.3.5-dist/js/bootstrap'),
    fancyBox = require('fancyBox/source/jquery.fancybox');


module.exports = function() {
    $(".fancybox").fancybox(
        {arrows: false}
    );
};