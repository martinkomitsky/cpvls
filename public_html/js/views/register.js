define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/register');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-main content__game-main_visible',
		events: {
			'submit .game-menu__form': 'submit'
		},
		submit: function (event) {
			event.preventDefault();
			var data = this.$('.game-menu__form').serializeObject()
			console.info("data", data);
		}

	});

	return View;
});