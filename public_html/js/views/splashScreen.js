define(function(require) {

	var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/splashScreen');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__splash js-splashscreen',
		render: function () {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'keyup': function(e) {
				this.$el.addClass('game__splash_hidden');
			},
			'animationend': function(e) {
				Backbone.history.navigate('#main', {trigger: true});
				this.$el.removeClass('game__splash_hidden')
			}
		}
	});

	return View;
});