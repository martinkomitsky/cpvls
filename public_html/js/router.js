define(function(require) {

	var Backbone = require('backbone'),
		require = require('require'),
		main = require('views/main'),
		game = require('views/game'),
		login = require('views/login'),
		scoreboard = require('views/scoreboard'),
		register = require('views/register'),
		howtoplay = require('views/howtoplay'),
		splashScreen = require('views/splashScreen'),
		event = require('event');

	var Router = Backbone.Router.extend({
		routes: {
			'main': 'main',
			'login': 'login',
			'register': 'register',
			'scoreboard': 'scoreboard',
			'game': 'game',
			'howtoplay': 'howtoplay',
			'*default': 'defaultAction'
		},
		initialize: function () {
			this.currentView = main;
			this.listenTo(event, 'navigate', this.changeRoute);
		},
		main: function() {
			main.show();
		},
		login: function() {
			login.show();
		},
		register: function() {
			register.show();
		},
		scoreboard: function() {
			scoreboard.show();
		},
		game: function() {
			game.show();
		},
		howtoplay: function() {
			howtoplay.show();
		},
		defaultAction: function () {
			splashScreen.show();
			this.currentView = splashScreen;
		},
		changeRoute: function (route) {
			this.navigate(route, {trigger: true});
		}
	});

	return new Router();
});