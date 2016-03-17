define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/howtoplay');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-menu content__game-main_visible js-howtoplay'
	});

	return View;
});