define(
    ['views/baseView','tmpl/login', 'event'],
    function (baseView, tmpl, event) {
        var View = baseView.extend({
            template: tmpl,
            render: function() {
                return baseView.prototype.render.call(this);
            },
            initialize: function () {
            },
        });

        return new View();
    }
);