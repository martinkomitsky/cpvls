define(function (require) {

	var Backbone = require('backbone');

	var View = Backbone.View.extend({
		template: {},
		initialize: function () {
			console.info('[INIT]', this.$el);
			this.bindEvents();
			return this;
		},
		render: function () {
			this.$el.html(this.template());
			// this.$('.js-focus').eq(0).focus();
			// console.log('render');
			return this;
		},
		show: function () {
			this.trigger('show', this);
			this.$el.show();
			this.$('.js-focus').eq(0).focus();
		},
		hide: function () {
			this.$el.hide();
		},
		bindEvents: function() {
		},
		events: {

		}
	});

	return View;
});