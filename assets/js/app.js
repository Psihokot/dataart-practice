var index = require('./index'),
    good = require('./good'),
    basket = require('./basket'),
    order = require('./order'),
    basketCount = require('./basketCount'),
    tableConstruct = require('./tableConstruct');

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

        function loadTemplate(template) {
            
            if (templateHash == "good") {
                var goodId = getGoodID() - 1;
                
                if (localStorage.getItem('good#' + getGoodID())) {       // чтобы не было обнуления количества товара
                    var goodView = JSON.parse(localStorage.getItem('good#' + getGoodID()));
                } else {
                    goodView = view.good[goodId];
                    goodView.numberOf = "0";
                }

                var rendered = Mustache.render(template, goodView);
                mainTemplate.html(rendered);
                localStorage.setItem('elementId', goodView.id);
                localStorage.setItem('good#' + goodView.id, JSON.stringify(goodView));
            } else {
                rendered = Mustache.render(template, view);
                mainTemplate.html(rendered);
            }

            basketCount();
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
                    
                    if (templateHash == 'basket') {
                        data = tableConstruct(data);
                    }
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

        getJSONData();
    });
};