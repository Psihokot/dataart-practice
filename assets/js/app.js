module.exports = {

    index : require('./index'),
    good : require('./good'),
    basket : require('./basket'),
    order : require('./order'),
    basketCount : require('./utils/basketCount'),
    tableConstruct : require('./utils/tableConstruct'),
    goodsModel: require('./models/goodModel.js'),

    templateHash: "",
    mainTemplate: {},

    init: function(){

        var self = this;

        this.findTemplateHash();
        this.mainTemplate = $('.main_content');

        if (this.templateHash == '') {
            this.templateHash = "index";
        }

        window.onhashchange = function () {

            self.findTemplateHash();

            if (self.templateHash == '') {
                self.templateHash = "index";
            }
            self.loadPage();
        };
        
        this.goodsModel.fetch(self);

    },

    findTemplateHash: function() {
        var hash = location.hash;

        this.templateHash = '';

        if (hash.indexOf("/") != -1) {
            this.templateHash = hash.slice(1, hash.indexOf("/"));
        } else {
            this.templateHash = hash.substring(1);

            if (this.templateHash == '') {
                this.templateHash = "index";
            }
        }
    },

    loadTemplate: function(template) {

        if (this.templateHash == "good") {
            
            var goodView = this.goodsModel.getGoodsView(),
                rendered = Mustache.render(template, goodView);
            
            this.mainTemplate.html(rendered);

            this.goodsModel.setGood(goodView);
            
        } else {
            rendered = Mustache.render(template, this.goodsModel);
            this.mainTemplate.html(rendered);
        }

        this.basketCount();

        this[this.templateHash] ?
            this[this.templateHash].init() :
            this['index'].init();
    },

    loadPage: function() {
        var self = this;

        $.ajax({
            type: "GET",
            url: "../assets/templates/" + self.templateHash + ".mustache",
            success: function(data) {

                if (self.templateHash == 'basket') {
                    data = self.tableConstruct.implement(data);
                }
                self.loadTemplate(data);
            },
            error: function() {
                $.ajax({
                    type: "GET",
                    url: "../assets/templates/index.mustache",
                    success: function(data) {
                        self.loadTemplate(data);
                    }
                });
            }
        });
    }
};