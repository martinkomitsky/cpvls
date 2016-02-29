define(
    ['views/baseView','tmpl/main'],
    function (baseView, tmpl) {
        var View = baseView.extend({
            template: tmpl,
            render: function() {
                $(".game-menu__nav-item").eq(0).focus();
                return baseView.prototype.render.call(this);
            }
        });

        return new View();
    }
);