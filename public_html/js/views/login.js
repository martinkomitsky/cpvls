define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/login'),
		session = require('models/session');

	var View = BaseView.extend({
		model: session,
		template: tmpl,
		className: 'content__game-main content__game-main_visible js-login',
		render: function() {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'submit .game-menu__form': 'submit'
		},
		initialize: function () {
			console.log('init');
			this.listenTo(this.model, 'change', function (e) {
				console.info('session change', e)
			})
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.game-menu__form').serializeObject()
			console.info("data", data);

			this.model.save(data, {
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
			});

			if (session.validationError) {
				console.log('validation error', session.validationError)
				this.$('.game-menu__nav-item_input').
					removeClass('game-menu__nav-item_input_valid');

				$.each(session.validationError, function(key, val) {
					if (!val) {
						this.$('.game-menu__nav-item_input[name=' + key + ']').addClass('game-menu__nav-item_input_invalid');
					} else {
						this.$('.game-menu__nav-item_input[name=' + key + ']').addClass('game-menu__nav-item_input_valid');
					}
				}.bind(this));

			} else {
				this.$('.game-menu__nav-item_input')
					.removeClass('game-menu__nav-item_input_invalid')
					.addClass('game-menu__nav-item_input_valid');

				this.$('.game-menu__form')[0].reset();
			}
		}

	});

	return View;
});