define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/register');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-main content__game-main_visible',
	});

	return new View();
});