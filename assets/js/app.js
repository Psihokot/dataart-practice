var index = require('./index'),
    good = require('./good'),
    basket = require('./basket'),
    order = require('./order');


module.exports = function() {
    $(function () {
        var templateHash = location.hash.substring(1),
            view = {},
            mainTemplate = $('.main_content');

        if (templateHash == '') {
            templateHash = "index";
        }

        window.onhashchange = function () {
            templateHash = location.hash.substring(1);
            if (templateHash == '') {
                templateHash = "index";
            }
            loadPage();
        };

        function loadTemplate(data) {
            var rendered = Mustache.render(data, view);
            mainTemplate.html(rendered);
            switch (templateHash) {
                case "index":
                    index();
                    break;
                case "good":
                    good();
                    break;
                case "basket":
                    basket();
                    break;
                case "order":
                    order();
                    break;
            }
        }

        function loadPage() {
            $.ajax({
                type: "GET",
                url: "../assets/templates/" + templateHash + ".mustache",
                success: function(data) {
                    loadTemplate(data);
                },
                error: function() {
                    $.ajax({
                        type: "GET",
                        url: "../assets/templates/index.mustache",
                        success: function(data) {
                            loadTemplate(data);
                        }
                    });
                }
            });
        }

        function getJSONData() {
            $.ajax({
                type: "GET",
                url: "../assets/json/data.json",
                dataType: "json",
                success: function(data) {
                    view.goods = data;
                    loadPage();
                }
            });
        }

        getJSONData();
    });
};