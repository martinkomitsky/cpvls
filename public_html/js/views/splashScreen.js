define(function(require) {

	var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/splashScreen');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-splash',
		render: function() {

			return BaseView.prototype.render.call(this);
		},
	});

	return View;
});