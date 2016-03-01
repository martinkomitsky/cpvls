define( function(require) {
    
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/login'),
        event = require('event');

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