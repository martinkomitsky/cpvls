define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/login'),
		session = require('models/session'),
		user = require('models/user');

	var View = BaseView.extend({
		template: function() {
			return tmpl({
				user: user,
				session: session,
				errorReason: this.errorReason,
				validationError: session.validationError || {},
				formData: this.formData || {},
				errorAnimation: this.errorAnimation
			});
		},
		model: session,
		user: user,
		className: 'game__main game__main_visible js-login',
		show: function () {
			console.log("[show]");
			this.$('.js-form').attr('novalidate', 'novalidate');
			return BaseView.prototype.show.call(this);
		},
		events: {
			'submit .js-form': 'submit',
			'reset .js-form': 'reset'
		},
		initialize: function () {
			this.errorReason = false;
			this.errorAnimation = true;
			return BaseView.prototype.initialize.call(this);
		},
		submit: function (event) {
			event.preventDefault();
			this.formData = this.$('.js-form').serializeObject();
			this.formData.login = this.formData.login.toLowerCase();

			this.model.save(this.formData, {
				success: function (model, xhr) {
					this.user.set({login: this.model.get('login')});
					this.model.set({isSignedIn: true, login: '', password: ''});
					this.errorReason = false;
					// this.render();
					this.formData = null;
					this.$('.js-form').trigger('reset');
					this.errorAnimation = true;
					Backbone.history.navigate('#main', {trigger: true});
				}.bind(this),
				error: function (model, xhr) {
					this.errorReason = JSON.parse(xhr.responseText).error;
					this.model.set({isSignedIn: false, trigger: "kek"});
					// this.render();
					// this.show();
					this.errorAnimation = false;
					console.warn('[error reason]', this.errorReason);
				}.bind(this)
			});

			if (session.validationError) {
				console.warn('[validation error]', session.validationError);
			}
			this.render();
			this.show();
		},
		reset: function (event) {
			$.each(this.$('.js-input'), function (key, val) {
				$(val).attr('value', '');
			});
		},
		bindEvents: function () {
			this.listenTo(this.model, 'change', function (model) {
				this.render();
				if (Backbone.history.fragment === 'login') {
					this.show();
				}
				console.log('[login] session change', model);
			});
		}

	});

	return View;
});