$(function() {
    var templateHash = "main-index",
        view = {},
        mainTemplate = $('.main_content');
    
    window.onhashchange = function() {
        var hash = location.hash;
        switch (hash) {
            case "":
            case "#":
            case "#main-index":
                templateHash = "main-index";
                loadPage();
                break;
            case "#main-good":
                templateHash = "main-good";
                loadPage();
                break;
            case "#main-basket":
                templateHash = "main-basket";
                loadPage();
                break;
            case "#main-order":
                templateHash = "main-order";
                loadPage();
                break;
            default:
                templateHash = "main-index";
                loadPage();
                break;
        }
    };

    function loadTemplate(data) {
        var rendered = Mustache.render(data, view);
        mainTemplate.html(rendered);
        $.getScript("js/js-index.js");
    }

    function loadPage() {
        mainTemplate.after("<div id='elem' style='display: none'></div>");
        var elem = $("#elem");
        elem.load("templates/" + templateHash + ".mustache", function(data) {
            loadTemplate(data);
        });
        elem.remove();
    }

    function getJSONData() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'json/data.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                view.goods = JSON.parse(xhr.responseText);
            }
        };
        xhr.onloadend = loadPage();
    }

    getJSONData();
});