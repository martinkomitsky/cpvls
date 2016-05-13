define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/howtoplay');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__main game__main_visible js-howtoplay'
	});

	return View;
});