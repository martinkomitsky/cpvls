define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/login'),
		User = require('models/user');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-main content__game-main_visible',
		render: function() {
			return BaseView.prototype.render.call(this);
		},
		events: {
			'submit .game-menu__form': 'submit'
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.game-menu__form').serializeObject()
			console.info("data", data);

			var user = new User();
			user.save(data);

			if (user.validationError) {
				console.log(user.validationError)
				this.$('.game-menu__nav-item_input').removeClass('game-menu__nav-item_input_valid').addClass('game-menu__nav-item_input_invalid');
			} else {
				this.$('.game-menu__nav-item_input').removeClass('game-menu__nav-item_input_invalid').addClass('game-menu__nav-item_input_valid');
				this.$('.game-menu__form')[0].reset();
			}
		}

	});

	return View;
});