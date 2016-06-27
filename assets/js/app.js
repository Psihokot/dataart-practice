var index = require('./index'),
    good = require('./good'),
    basket = require('./basket'),
    order = require('./order');

module.exports = function() {
    $(function () {
        var templateHash = findTemplateHash(),
            view = {},
            mainTemplate = $('.main_content');

        if (templateHash == '') {
            templateHash = "index";
        }

        function findTemplateHash() {
            var hash = location.hash;

            templateHash = '';

            if (hash.indexOf("/") != -1) {
                templateHash = hash.slice(1, hash.indexOf("/"));
            } else {
                templateHash = hash.substring(1);

                if (templateHash == '') {
                    templateHash = "index";
                }
            }
            return templateHash;
        }

        function getGoodID() {
            var hash = location.hash;
            this.goodID = hash.substring(hash.indexOf("/") + 1);
            return this.goodID;
        }

        window.onhashchange = function () {
            templateHash = findTemplateHash();
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
                    localStorage.setItem('elementId', getGoodID());
                    good();

                    break;
                case "basket":
                    basket();
                    break;
                case "order":
                    order();
                    break;
                default:
                    index();
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
                    view = data;
                    loadPage();
                }
            });
        }

        if (localStorage.getItem('basketCounter')) {
            localStorage.setItem('basketCounter', localStorage.getItem('basketCounter'));
        } else {
            localStorage.setItem('basketCounter', 0);
        }
        getJSONData();
    });
};