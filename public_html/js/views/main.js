define( function(require) {
    
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/main');

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