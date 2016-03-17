var require = {
	urlArgs: '_=' + (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		underscore: 'lib/underscore',
		jquery: 'lib/jquery',
		serializeObject: 'lib/serializeObject',
		backbone: 'lib/backbone',
		phaser: 'lib/phaser'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'serializeObject': {
			deps: ['jquery']
		}
	}
};