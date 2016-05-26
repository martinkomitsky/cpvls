define(function(require) {

	var tmpl = require('tmpl/toolbar'),
		user = require('models/user'),
		session = require('models/session');

	var View = Backbone.View.extend({
		model: session,
		user: user,
		template: function () {
			return tmpl({user: user.toJSON(), session: session.toJSON()});
		},
		className: 'toolbar__rar',
		initialize: function () {
			this.render();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		}
	});

	return new View();
});