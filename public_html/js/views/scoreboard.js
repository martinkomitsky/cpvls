define(function(require) {

	var Backbone = require('backbone'),
		BaseView = require('views/baseView'),
		tmpl = require('tmpl/scoreboard'),
		scores = require('collections/scores');

		var View = BaseView.extend({
			template: function() {
				return tmpl({scores: scores.toJSON()});
			},
			className: 'game__main game__main_visible js-scoreboard',
			collection: scores,
			initialize: function () {
				scores.fetch({
					success: function (collection, response) {
						collection.each(function (item, index, all) {
							item.set('name', item.get('login'));
							item.set('score', item.get('highscore'));
						});
						this.render();
					}.bind(this)
				});
			}
		});

	return View;
});