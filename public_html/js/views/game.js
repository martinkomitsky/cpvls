define(function(require) {

	var BaseView = require('views/baseView'),
		tmpl = require('tmpl/game'),
		phaser = require('lib/phaser'),
		G = require('game/game');

	var View = BaseView.extend({
		template: tmpl,
		className: 'game__main game__main_visible js-game',
		initialize: function() {
			this.gameObj = new G();
			// debugger;
		},
		render: function() {
			console.log("Script is in action");
			var state = {
				preload: this.gameObj.preload.bind(this, this.gameObj),
				create: this.gameObj.create.bind(this, this.gameObj),
				update: this.gameObj.update.bind(this, this.gameObj)
			};
			this.game = new Phaser.Game("100", "100", Phaser.AUTO, 'playscreen', state);
			window.game = this.game;
			window.g = this.gameObj;

			return BaseView.prototype.render.call(this);
		},
	});


	return View;
});