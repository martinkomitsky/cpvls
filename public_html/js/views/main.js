define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/main'),
		user = require('models/user'),
		session = require('models/session');

	var View = BaseView.extend({
		model: user,
		template: function() {
			return tmpl({user: user, session: session});
		},
		className: 'content__game-main content__game-main_visible js-main',
		initialize: function () {
			console.log('[init]', this.$el);

			session.fetch({
				success: function (model, xhr) {
					console.log('success', xhr);
					session.set({isSignedIn: true});
				}.bind(this),
				error: function (model, xhr) {
					console.log('error', xhr.responseText);
				}
			});

			this.listenTo(this.model, 'change', function (e) {
				console.log('change main', e)
				this.render();
			});
			this.listenTo(session, 'change', function (e) {
				console.log('change session', e)
				this.render();
			});
		},
		render: function() {
			return BaseView.prototype.render.call(this);
		}
	});

	return View;
});