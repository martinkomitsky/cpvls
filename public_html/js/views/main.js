define(function(require) {

    var BaseView = require('views/baseView'),
        tmpl = require('tmpl/main');

    var View = BaseView.extend({
        template: tmpl,
        render: function() {
            $(".game-menu__nav-item").eq(0).focus();
            return BaseView.prototype.render.call(this);
        }
    });

        return new View();
    }
);