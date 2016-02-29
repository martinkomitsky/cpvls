define(
    ['views/baseView','tmpl/game', 'event'],
    function (baseView, tmpl, event) {
        var View = baseView.extend({
            template: tmpl,
            render: function() {
                // code
                return baseView.prototype.render.call(this);
            },
            initialize: function () {
            },
        });

        return new View();
    }
);