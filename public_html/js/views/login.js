define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/login'),
		session = require('models/session'),
		user = require('models/user');

	var View = BaseView.extend({
		model: session,
		user: user,
		template: tmpl,
		className: 'game__main game__main_visible js-login',
		render: function() {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'submit .js-form': 'submit'
		},
		initialize: function () {

		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.js-form').serializeObject();
			console.info("data", data);


			this.model.save(data, {
				success: function (model, xhr) {
					// alert('success');
					this.user.set({login: this.model.get('login')});
					this.model.set({isSignedIn: true, login: '', password: ''});
					this.render();
					Backbone.history.navigate('#main', {trigger: true});
				}.bind(this),
				error: function (model, xhr) {
					console.log(xhr.responseText);
					alert('error');
				}
			});

			if (session.validationError) {
				console.log('validation error', session.validationError);
				this.$('.menu__item_input').
					removeClass('menu__item_input_valid');

				$.each(session.validationError, function(key, val) {
					if (!val) {
						this.$('.menu__item_input[name=' + key + ']').addClass('menu__item_input_invalid');
					} else {
						this.$('.menu__item_input[name=' + key + ']').addClass('menu__item_input_valid');
					}
				}.bind(this));

			} else {
				this.$('.menu__item_input')
					.removeClass('menu__item_input_invalid')
					.removeClass('menu__item_input_valid');

				this.$('.js-form')[0].reset();
			}
		}

	});

	return View;
});