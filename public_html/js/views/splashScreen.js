define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/splashScreen'),
		event = require('event');

	var View = BaseView.extend({
		template: tmpl,
		className: 'content__game-splash',
		render: function() {
			$(document).on('keypress', 'body', function(e) {
				$(".content__game-splash").addClass('content__game-splash_hidden');
				$(document).off('keypress')
			}).on('animationend', '.content__game-splash', function(e) {
				$('.content__game-splash').hide();
				event.trigger('navigate', 'main');
			});
			return BaseView.prototype.render.call(this);
		},
	});

	return new View();
});