$(function() {
    var templateHash = "main-index",
        view = {};
    
    window.onhashchange = function() {
        var hash = location.hash;
        switch (hash) {
            case "":
            case "#":
            case "#main-index":
                templateHash = "main-index";
                loadPage(templateHash);
                break;
            case "#main-good":
                templateHash = "main-good";
                loadPage(templateHash);
                break;
            case "#main-basket":
                templateHash = "main-basket";
                loadPage(templateHash);
                break;
            case "#main-order":
                templateHash = "main-order";
                loadPage(templateHash);
                break;
            default:
                templateHash = "main-index";
                loadPage(templateHash);
                break;
        }
    };

    function loadTemplate() {
        var str = $('#template').html();
        var rendered = Mustache.render(str, view);
        $('.main_content').html(rendered);
        $.getScript("js/js-index.js");
        $("#templates").html("");
    }
    
    function loadPage(templateHash) {
        $("#templates").load("templates/" + templateHash + ".html", function(data) {
            view.data = data;
            loadTemplate();
        });
    }
    
    loadPage(templateHash);
    
});