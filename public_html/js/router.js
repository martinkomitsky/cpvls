define(function(require) {

	var Backbone = require('backbone'),
		app = require('views/appView'),

		Main = require('views/main'),
		Game = require('views/game'),
		GameMP = require('views/gameMP'),
		Login = require('views/login'),
		Scoreboard = require('views/scoreboard'),
		Register = require('views/register'),
		Howtoplay = require('views/howtoplay'),
		SplashScreen = require('views/splashScreen'),
		ChooseYourDestiny = require('views/chooseyourdestiny');

	app.add({
		'main': Main,
		'game': Game,
		'gameMP': GameMP,
		'login': Login,
		'scoreboard': Scoreboard,
		'register': Register,
		'howtoplay': Howtoplay,
		'splashscreen': SplashScreen,
		'chooseyourdestiny': ChooseYourDestiny
	});
	app.render();


	var Router = Backbone.Router.extend({
		routes: {
			'main': 'main',
			'login': 'login',
			'register': 'register',
			'scoreboard': 'scoreboard',
			'game': 'game',
			'gameMP': 'gameMP',
			'howtoplay': 'howtoplay',
			'chooseyourdestiny': 'chooseyourdestiny',
			'*default': 'defaultAction'
		},
		initialize: function () {
			// app.get('splashscreen').on('navigate', this.goToMain.bind(this));
		},
		main: function () {
			app.get('main').show();
		},
		login: function () {
			app.get('login').show();
		},
		register: function () {
			app.get('register').show();
		},
		scoreboard: function () {
			app.get('scoreboard').show();
		},
		game: function () {
			app.get('game').show();
		},
		gameMP: function () {
			app.get('gameMP').show();
		},
		howtoplay: function () {
			app.get('howtoplay').show();
		},
		chooseyourdestiny: function () {
			app.get('chooseyourdestiny').show();
		},
		defaultAction: function () {
			app.get('splashscreen').show();
		},

		goToMain: function () {
			this.navigate('main', {trigger: true});
		}
	});

	return new Router();
});