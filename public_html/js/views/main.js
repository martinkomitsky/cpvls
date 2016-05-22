define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/main'),
		user = require('models/user'),
		session = require('models/session');

	var View = BaseView.extend({
		model: user,
		template: function () {
			return tmpl({user: user, session: session});
		},
		className: 'game__main game__main_visible js-main',
		bindEvents: function () {
			this.listenTo(this.model, 'change', this.renderAfterChange.bind(this, 'user'));
			this.listenTo(session, 'change', this.renderAfterChange.bind(this, 'session'));
		},
		renderAfterChange: function (name, model) {
			console.log('[MAIN] ' + name + ' changed', model.toJSON());
			this.render();
		}
	});

	return View;
});