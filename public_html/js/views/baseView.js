define(function (require) {

	var Backbone = require('backbone');

	var View = Backbone.View.extend({
		template: {},
		initialize: function () {
			console.log('[INIT]', this.$el);
			this.bindEvents();
			return this;
		},
		render: function () {
			this.$el.html(this.template());
			console.log('render');
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