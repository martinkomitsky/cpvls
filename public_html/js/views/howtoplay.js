define( function(require) {
    
    var baseView = require('views/baseView'),
        tmpl = require('tmpl/howtoplay');

    var View = baseView.extend({
        template: tmpl
    });

        return new View();
    }
);