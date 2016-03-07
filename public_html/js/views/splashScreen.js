define(function(require) {

	var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/splashScreen');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-splash',
		render: function () {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'keyup': function(e) {
				console.info('keyup dokhooya');
				this.$el.addClass('content__game-splash_hidden');
			},
			'animationend': function(e) {
				this.trigger('navigate');
				this.$el.removeClass('content__game-splash_hidden')
			}
		}
	});

	return View;
});