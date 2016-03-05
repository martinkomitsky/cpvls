define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/main');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-main content__game-main_visible',
		render: function() {
			return BaseView.prototype.render.call(this);
		}
	});

	return new View();
});