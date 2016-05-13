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
		initialize: function () {
			console.log('[init]', this.$el);

			session.fetch({
				success: function (model, xhr, c) {
					console.log('success', xhr);
					session.set({isSignedIn: true});
					user.fetch({
						success: function (model, xhr) {
							console.log('user fetch success', model, xhr, c);

						}.bind(this),
						error: function (model, xhr) {
							console.log('error', xhr.responseText);
						}
					});
				}.bind(this),
				error: function (model, xhr) {
					console.log('error', xhr.responseText);
				}
			});

			this.listenTo(this.model, 'change', function (e) {
				console.log('[MAIN] user changed', e);
				this.render();
			});
			this.listenTo(session, 'change', function (e) {
				console.log('[MAIN] session changed', e);
				this.render();
			});
		},
		render: function () {
			return BaseView.prototype.render.call(this);
		}
	});

	return View;
});