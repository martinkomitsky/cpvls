define(function(require) {

    var BaseView = require('views/baseView'),
        tmpl = require('tmpl/howtoplay');

    var View = BaseView.extend({
        template: tmpl
    });

        return new View();
    }
);