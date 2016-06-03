define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/chooseyourdestiny');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__main game__main_visible js-chooseyourdestiny',
		initialize: function() {
			// debugger;
		},
		render: function() {


			return BaseView.prototype.render.call(this);
		},
	});


	return View;
});