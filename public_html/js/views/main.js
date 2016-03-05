define(function(require) {

    var BaseView = require('views/baseView'),
        tmpl = require('tmpl/main');

    var View = BaseView.extend({
        template: tmpl,
        render: function() {
            return BaseView.prototype.render.call(this);
        }
    });

    return new View();
});