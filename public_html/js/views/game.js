define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/game'),
		phaser = require('lib/phaser'),
		G = require('game/game');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__main game__main_visible js-game',
		initialize: function() {
			g = new G();
			// debugger;
		},
		render: function() {
			console.log("Script is in action");
			var state = {
				preload: g.preload.bind(this, g),
				create: g.create.bind(this, g),
				update: g.update.bind(this, g)
			};
			this.game = new Phaser.Game("100", "100", Phaser.AUTO, 'playscreen', state);
			window.game = this.game;

			return BaseView.prototype.render.call(this);
		},
	});


	return View;
});