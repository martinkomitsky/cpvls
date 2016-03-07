define(function (require) {

	var Backbone = require('backbone');

	var View = Backbone.View.extend({
		template: {},
		initialize: function () {
			console.log('[INIT]', this.$el);

			// this.render();
			this.bindEvents();
			return this;
		},
		render: function () {
			this.$el.html(this.template());

			return this;
		},
		show: function () {
			// $('.game').html(this.render().el);
			this.trigger('show', this);
			this.$el.show();
			this.$('.js-focus').eq(0).focus();
		},
		hide: function () {
			this.$el.hide();
			// this.$el.off();
		},
		bindEvents: function() {
			// console.info('[bindEvents]');
		},
		events: {

        }
	});

	return View;
});