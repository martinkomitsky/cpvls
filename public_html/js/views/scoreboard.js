define(function(require) {

	var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/scoreboard'),
		scores = require('collections/scores');

		var View = BaseView.extend({
			template: function() {
				return tmpl({scores: scores.toJSON()});
			},
			className: 'content__game-main content__game-main_visible',
			collection: scores,
		});

	return View;
});