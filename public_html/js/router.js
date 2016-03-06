define(function(require) {

	var Backbone = require('backbone'),
		app = require('views/appView'),

		Main = require('views/main'),
		Game = require('views/game'),
		Login = require('views/login'),
		Scoreboard = require('views/scoreboard'),
		Register = require('views/register'),
		Howtoplay = require('views/howtoplay'),
		SplashScreen = require('views/splashScreen');

	app.views.add({
		'main': Main,
		'game': Game,
		'login': Login,
		'scoreboard': Scoreboard,
		'register': Register,
		'howtoplay': Howtoplay,
		'splashscreen': SplashScreen
	});
	app.render();


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
		},
		main: function() {
			app.views.get('main').show();
		},
		login: function() {
			app.views.get('login').show();
		},
		register: function() {
			app.views.get('register').show();
		},
		scoreboard: function() {
			app.views.get('scoreboard').show();
		},
		game: function() {
			app.views.get('game').show();
		},
		howtoplay: function() {
			app.views.get('howtoplay').show();
		},
		defaultAction: function () {
			app.views.get('splashscreen').show();
		}
	});

	return new Router();
});