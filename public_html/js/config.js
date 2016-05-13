var require = {
	urlArgs: '_=' + (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		underscore: 'lib/underscore',
		jquery: 'lib/jquery',
		serializeObject: 'lib/serializeObject',
		objectHasFalseValue: 'lib/objectHasFalseValue',
		backbone: 'lib/backbone',
		phaser: 'lib/phaser',
		FileAPI: 'lib/fileapi/FileAPI.min'
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