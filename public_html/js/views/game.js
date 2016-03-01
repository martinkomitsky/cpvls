define(
    ['views/baseView','tmpl/game', 'phaser', 'event'],
    function (baseView, tmpl, Phaser, event) {
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