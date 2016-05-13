define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/login'),
		session = require('models/session');

	var View = BaseView.extend({
		model: session,
		template: tmpl,
		className: 'game__main game__main_visible js-login',
		render: function() {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'submit .js-form': 'submit'
		},
		initialize: function () {
			console.log('init');
			this.listenTo(this.model, 'change', function (e) {
				console.info('[LOGIN] session changed', e);
			});
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.js-form').serializeObject()
			console.info("data", data);

			this.model.sync('create', this.model, {
				success: function (model, xhr) {
					alert('success');
					console.log(xhr);
					session.set({isSignedIn: true});
					this.render();
					this.trigger('navigate')
				}.bind(this),
				error: function (model, xhr) {
					alert('error');
					console.log(xhr.responseText);
				}
			},
				data
			);

			if (session.validationError) {
				console.log('validation error', session.validationError)
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
					.addClass('menu__item_input_valid');

				this.$('.js-form')[0].reset();
			}
		}

	});

	return View;
});